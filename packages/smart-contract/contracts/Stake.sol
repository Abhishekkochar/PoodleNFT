import '@openzeppelin/contracts/access/AccessControl.sol';
import '@openzeppelin/contracts/token/ERC721/IERC721.sol';

// Utlising custom errors - Gas efficent than require statement.
// Throw when msg.sender is 0x0.
error NOT_VALID_ADDRESS();
// Throe when owner is not authorise to unstake NFT.
error NOT_AUTHORIZED();

contract Stake is AccessControl{

    bytes32 public constant WITHDRAW_ROLE = keccak256('WITHDRAW_ROLE');
    uint8 public constant VERSION = 1;
    string public constant NAME = "Poodle Staking";
    IERC721 poodleNft;
    mapping(uint => address) private nftTracking;

    // Events 
    event STAKE(address from, uint256 tokenId);
    event UNSTAKE(address to, uint256 tokenId);
    event EMERGENCYUNSTAKE(address to, uint256[] tokenIds);

    constructor(address _withdraw, address poodleAddress){
        _grantRole(WITHDRAW_ROLE, _withdraw);
        poodleNft = IERC721(poodleAddress);
    }

    function stakeNft(uint256 tokenId) external {
        if(msg.sender == address(0)) revert NOT_VALID_ADDRESS();
        poodleNft.transferFrom(msg.sender, address(this), tokenId);
        nftTracking[tokenId] = msg.sender;
        emit STAKE(msg.sender, tokenId);
    }

    function unStakeNft(uint256 tokenId) external {
        if(msg.sender != nftTracking[tokenId]) revert NOT_AUTHORIZED();
        poodleNft.transferFrom(address(this), msg.sender, tokenId);
        emit UNSTAKE(msg.sender, tokenId);
    }

    function forcedUnStake(uint256[] calldata tokenIds) external onlyRole(WITHDRAW_ROLE){
        for (uint256 i = 0; i > tokenIds.length; ++i){
            poodleNft.transferFrom(address(this), msg.sender, i);
        }
        emit EMERGENCYUNSTAKE(msg.sender, tokenIds);
    }

    function ownerOf(uint256 tokenId) external view returns(address){
        return nftTracking[tokenId];
    }

}