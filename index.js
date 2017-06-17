// web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
abi = JSON.parse('[{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"totalVotesFor","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"validCandidate","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"votesReceived","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"x","type":"bytes32"}],"name":"bytes32ToString","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"candidateList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"voteForCandidate","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"contractOwner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"inputs":[{"name":"candidateNames","type":"bytes32[]"}],"payable":false,"type":"constructor"}]')


window.onload = function() {
  VotingContract = web3.eth.contract(abi);
  // In your nodejs console, execute contractInstance.address to get the address at which the contract is deployed and change the line below to use your deployed address
  contractInstance = VotingContract.at('0x7e5471572701bb146b22bc61103e0bc18361b38d');
  candidates = {"Rama": "candidate-1", "Nick": "candidate-2", "Jose": "candidate-3"}

  refreshVotes = () => {
    candidateNames = Object.keys(candidates);
    for (var i = 0; i < candidateNames.length; i++) {
      let name = candidateNames[i];
      contractInstance.totalVotesFor.call(name, (err, val) => {
        if (err === null)
          { $('#' + candidates[name]).html(val.toString());
            console.log(val.toString())
          }
        else
          { console.log(err) }
      });
    };
  }

  voteForCandidate = (candidate) => {
    candidateName = $("#candidate").val();
    contractInstance.voteForCandidate(candidateName, {from: web3.eth.accounts[0]}, (err, val) => {
      console.log(val);
      refreshVotes();
    });
    $("#candidate").val('');
    $("#candidate").val('');
    $("#vote-button").attr('disabled', 'disabled');
  }





  $(document).ready(refreshVotes);
}
