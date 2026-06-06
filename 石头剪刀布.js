let a='石头',b='剪刀',c='布',arr=[a,b,c],player,computer,playerwin=0,computerwin=0;
while(prompt('输入任意键继续游戏')){
    player=prompt('请输入');
    computer=arr[Math.floor(Math.random()*arr.length)]
    if(player!='剪刀'&&player!='石头'&&player!='布'){
        alert('输入非法');
    }
    if(computer==player){
        alert('电脑的决策为:'+computer+'\n'+'你的决策为:'+player+ '\n'+'平局');
    }
    else if(player=='剪刀'&&computer=='布'||player=='石头'&&computer=='剪刀'||player=='布'&&computer=='石头'){
        alert('电脑的决策为:'+computer+'\n'+'你的决策为:'+player+ '\n'+'你赢了!');
        playerwin++;
    }
    else{
        alert('电脑的决策为:'+computer+'\n'+'你的决策为:'+player+ '\n'+'你输了');
        computerwin++;
    }
}
alert('游戏结束,你赢了'+playerwin+'局'+'\n'+'电脑赢了'+computerwin+'局');