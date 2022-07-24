const Discord = require('discord.js');

var mongoUtil = require('../../mongoUtil.js');
const config = require('../../config.json');
exports.run = async(client,message,args,func)=>{
  var member = message.mentions.members.first() || null
  if(member === null){
    return message.channel.send('Please mention a player to play with.')
  }
  if(member.id===client.user.id){
    return message.channel.send("You can't play against me!")
  }
  if(member.user.bot){
    return message.channel.send('Bots wont reply. You can\'t play against them')
  }




var board=['`1`','`2`','`3`',
           '`4`','`5`','`6`',
           '`7`','`8`','`9`']
var timeup=false;
var toggle=Math.random()>=0.5
var AuthorId=message.author.id
var memberId=member.id
var play='❌',filter,player,timeup=false,defender,winner,counter=0
var brd= drawBoard(board)
const filter1 = m => m.author.id === AuthorId && parseInt(m.content)>=1 && parseInt(m.content)<=9;
const filter2 = m => m.author.id === memberId && (parseInt(m.content)>=1 && parseInt(m.content)<=9);

message.channel.send(`Lets start the game\n${brd}`)
while(true){
  if(toggle){
    player=AuthorId;
    defender=memberId
    filter=filter1
    toggle=false
    play='❌'
  }
  else{
    player=memberId;
    defender=AuthorId;
    filter=filter2
    toggle=true
    play='⭕'
  }
  await message.channel.send(`<@${player}>, its your turn. Enter a number between 1-9.\nYou have 15 seconds.`).then(async()=>{
      await message.channel.awaitMessages(filter,{max:1,time:15000,errors:['time']})
      .then(async(collected)=>{

        if(board[parseInt(collected.first().content)-1]==='❌' || board[parseInt(collected.first().content)-1]==='⭕' ){
          message.channel.send(`<@${player}>, that space is already taken`)
          brd=drawBoard(board)
          await message.channel.send(brd)
          toggle = !toggle
        }else{
          board[parseInt(collected.first().content)-1]=play
          brd=drawBoard(board)
          await message.channel.send(brd)
          counter++;
        }
      })
      .catch(collected=>{
        message.channel.send('Times up')
        timeup=true
      })

  })
  if(counter>=9){
    break;
  }
  if(checkWin(board,play))
  {
    winner=player
    break;
  }
  if(timeup){
    break;
  }
}

if(timeup){
    func.updateDb(collection,player,0,false)
    func.updateDb(collection,defender,20,true)
    return message.channel.send(`<@${player}> forfeited. Hence <@${defender}> won!!`)
}
if(winner){
    message.channel.send(`<@${winner}> won!!`)
    func.updateDb(collection,winner,20,true)
    func.updateDb(collection,defender,0,false)
}
else{
  message.channel.send(`It's a tie!!`)
}


}

function drawBoard(board){
  var msg=board[0]+'   |   '+board[1]+'   |   '+board[2]+'\n'+
          '-----------------\n'+
          board[3]+'   |   '+board[4]+'   |   '+board[5]+'\n'+
          '-----------------\n'+
          board[6]+'   |   '+board[7]+'   |   '+board[8]+'\n'
 return msg
}
function checkWin(board,play){
   if(board[0]==play && board[1]==play && board[2]==play)
   return true;
   if(board[3]==play && board[4]==play && board[5]==play)
   return true;
   if(board[6]==play && board[7]==play && board[8]==play)
   return true;
   if(board[0]==play && board[3]==play && board[6]==play)
   return true;
   if(board[1]==play && board[4]==play && board[7]==play)
   return true;
   if(board[2]==play && board[5]==play && board[8]==play)
   return true;
   if(board[0]==play && board[4]==play && board[8]==play)
   return true;
   if(board[2]==play && board[4]==play && board[6]==play)
   return true;
}
exports.help = {
  name : "tictactoe",
  category:'games'
};
