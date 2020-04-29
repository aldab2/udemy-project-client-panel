interface VotingAction {
  
   
  
  startVotingActoin(); // It show the MCM that their is a active voting action
  vote();

  endVotingAction();
  getVotingResults();


}
class SU {
 
}
class VA2 {
  
  startVotingActoin(){} // It show the MCM that their is a active voting action
  vote(){}

  endVotingAction(){}
  getVotingResults(){}
}
class  MCM2 extends SU {
  votingAction : VA2 ;
}

class MCM extends SU implements VotingAction {
  
  startVotingActoin(){} // It show the MCM that their is a active voting action
  vote(){}

  endVotingAction(){}
  getVotingResults(){}

  constructor(){
    super()
    const x = 5;
    this.startVotingActoin()

  }


}