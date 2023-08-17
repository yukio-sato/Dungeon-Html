var stage = 1, finalStage = 2;

var secretEncouter = false;

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

function updt()
{
    if (secretEncouter == false)
    {
        switch (stage) { // [0] Name [1] LV, [2] EXP [3] Gold [4] HP [5] AT [6] LU [7] KR [8] LinkedBattle
            case 1:
                monster = ["teste",1,15,3,20,5,0,0,0];
                ImageLink = "data:image/png;base64,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";
            break;
            case 2:
                monster = ["irineu",1,15,3,50,5,0,0,0];
                ImageLink = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHXiAWZnEe8HErRjsuXsnCOg-VJhKXJOWI_osRMAnwgmjtQMAq82QVK4uvLVFOc-PMVkc&usqp=CAU";
            break;
            default:
                monster = ["",0,0,0,0,0,0,0,0];
                ImageLink = "";
            break;
        }
    }
    monster_HP = monster[4];
    monster_KR = 0;
    document.getElementById("Nm").textContent = monster[0];
    document.getElementById("Img").src = ImageLink;
    document.getElementById("HPBar").value = monster_HP;
    document.getElementById("HPBar").max = monster[4];
    document.getElementById("HPLabel").textContent = monster_HP+"/"+monster[4];

    player_HP = 45;
    you[4] = 45;
    document.getElementById("HPBarPlayer").value = player_HP;
    document.getElementById("HPBarPlayer").max = you[4];
    document.getElementById("HPLabelPlayer").textContent = player_HP+"/"+you[4];
}
function dmg(){
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