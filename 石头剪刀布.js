let a='石头',b='剪刀',c='布',arr=[a,b,c],player,computer;
computer=arr[Math.floor(Math.random()*arr.length)]
player=prompt('请输入');
if(computer==player){
    console.log('电脑的决策为:'+computer);
    console.log('你的决策为:'+player);
    console.log('平局');
}
else if(player=='剪刀'&&computer=='布'||player=='石头'&&computer=='剪刀'||player=='布'&&computer=='石头'){
    console.log('电脑的决策为:'+computer);
    console.log('你的决策为:'+player)
    console.log('你赢了!');
}
else{
    console.log('电脑的决策为:'+computer);
    console.log('你的决策为:'+player)
    console.log('惜败');
}