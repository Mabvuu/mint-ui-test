// contracts/MyContract.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract MyContract {
    uint public totalMinted;
    event Minted(address indexed minter);

    function mint() external {
        totalMinted += 1;
        emit Minted(msg.sender);
    }
}
