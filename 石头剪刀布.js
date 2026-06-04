let a='石头',b='剪刀',c='布',arr=[a,b,c],player,computer,playerwin=0,computerwin=0;
computer=arr[Math.floor(Math.random()*arr.length)]
player=prompt('请输入');
while(!prompt('输入n结束游戏')){
    if(player!='剪刀'&&player!='石头'&&player!='布'){
        alert('输入非法');
    }
    if(computer==player){
        alert('电脑的决策为:'+computer);
        alert('你的决策为:'+player);
        alert('平局');
    }
    else if(player=='剪刀'&&computer=='布'||player=='石头'&&computer=='剪刀'||player=='布'&&computer=='石头'){
        alert('电脑的决策为:'+computer);
        alert('你的决策为:'+player);
        alert('你赢了!');
        playerwin++;
    }
    else{
        alert('电脑的决策为:'+computer);
        alert('你的决策为:'+player);
        alert('惜败');
        computerwin++;
    }
}
alert('游戏结束');
alert('你赢了'+playerwin+'局');
alert('电脑赢了'+computerwin+'局');