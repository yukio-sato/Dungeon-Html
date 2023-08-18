var stage = 1, finalStage = 2;

var secretEncouter = false;
var firstEncouter = false;
var ImageLink = "";

var player_HP = 0, player_KR = 0, exp = 0, gold = 0;
var monster_HP = 0, monster_KR = 0;

var you = [
    "", // name
    1, // lv
    10, // next
    0, // at
    0, // hp
    0, // lu
    "", // food1
    "", // food2
    "", // food3
    "" // food4
]

var monster = [
    "", // name
    1, // lv
    0, // exp
    0, // gold
    0, // hp
    0, // at
    0, // lu
    0, // karma
    0 // linkedBattle
]

var interact = [
    "", // first interact
    "", // second interact
    "", // third interact
    "" // fourth interact
]

function guiding(newLocation)
{
document.location.href = newLocation;
}

function expCalculator() {
    you.next = 10 + (15*(you.lv-1))
    if (you.next >= exp)
    {
        exp -= you.next;
        you.lv += 1;
        if (you.lv % 4 != 0)
        {
            you.at += 1;
            alert("AT");
        }
        else if (you.lv % 4 == 0)
        {
            you.hp += 4;
            player_HP += 4;
            alert("HP");
        }
    }
}

function stat()
{
    you[4] = Math.round(Math.random(1,6)*6)+6;
    player_HP = you[4];
    you[5] = Math.round(Math.random(1,6)*6)+6;
    you[6] = Math.round(Math.random(1,6)*6)+Math.round(Math.random(1,6)*6)+12;
}
function randoDialog()
{
    var x = Math.round(Math.random(interact.length)*3);
    if (firstEncouter == true)
    {
        firstEncouter = false;
        document.getElementById("Interact").textContent = interact[0];
    }
    else
    {
        document.getElementById("Interact").textContent = interact[x];
    }
}

function updt()
{
    if (secretEncouter == false)
    {
        switch (stage) { // [0] Name [1] LV, [2] EXP [3] Gold [4] HP [5] AT [6] LU [7] KR [8] LinkedBattle
            case 1:
                monster = ["teste",1,15,3,20,5,0,0,0];
                interact = ["Olá Mundo!","Tristeza",":(","ABC"]
                ImageLink = "https://github.com/ermogenes/aulas-programacao-web/raw/master/content/000057.png";
            break;
            case 2:
                monster = ["irineu",1,15,3,50,5,0,0,0];
                interact = ["Lorem Ipmisus","","",""]
                ImageLink = "";
            break;
            default:
                monster = ["",0,0,0,0,0,0,0,0];
                interact = ["","","",""]
                ImageLink = "";
            break;
        }
    }
    firstEncouter = true;
    randoDialog();
    monster_HP = monster[4];
    monster_KR = 0;
    document.getElementById("Nm").textContent = monster[0];
    document.getElementById("Img").src = ImageLink;
    document.getElementById("HPBar").value = monster_HP;
    document.getElementById("HPBar").max = monster[4];
    document.getElementById("HPLabel").textContent = monster_HP+"/"+monster[4];
    document.getElementById("HPBarPlayer").value = player_HP;
    document.getElementById("HPBarPlayer").max = you[4];
    document.getElementById("HPLabelPlayer").textContent = player_HP+"/"+you[4];
}
function dmg(){
    randoDialog();
    if (monster_HP > 0)
    {
        monster_HP -= 1;
        player_HP -= 1;
    }
    document.getElementById("HPBar").value = monster_HP;
    document.getElementById("HPBar").max = monster[4];
    document.getElementById("HPLabel").textContent = monster_HP+"/"+monster[4];
    document.getElementById("HPBarPlayer").value = player_HP;
    document.getElementById("HPBarPlayer").max = you[4];
    document.getElementById("HPLabelPlayer").textContent = player_HP+"/"+you[4];
    if (monster_HP == 0){
        stage += 1;
        updt();
    }

}

function back()
{
    if (stage > 1)
    {
        stage = 1;
        updt();
    }
}

function begin()
{
    stat();
    updt();
}