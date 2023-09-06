import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

contract Poodle is ERC721, Ownable {
    // Revert if the msg.sender is an owner
    error OWNER_NOT_ALLOWED_TO_MINT();

    constructor(string memory name, string memory symbol) ERC721(name, symbol) {}

    /**
     * External function to mint NFT
     * @param tokenId, id to mint
     * Owner is not allowed to mint Poodle NFT
     */
    function mint( uint256 tokenId) external {
        if(msg.sender == owner()) revert OWNER_NOT_ALLOWED_TO_MINT();
        _mint(msg.sender, tokenId);
    }

    /**
     * External function to send tokenId to
     * @param to, address to send the nft to
     * @param tokenId, Id to transfer
     */
    function transfer(address to, uint256 tokenId) external {
        _transfer(msg.sender, to, tokenId);
    }
}