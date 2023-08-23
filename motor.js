var stage = 1, finalStage = 2;

var secretEncouter = false;
var firstEncouter = false;
var ImageLink = "";

var player_HP = 0, player_KR = 0, exp = 0, gold = 0;
var monster_HP = 0, monster_KR = 0;
var weaponsFolder = [
    stick = [0,0,0,true], // [0][0] AT [0][0] DF [0][0] Heal Bonus [0][1] Have it <- Important
    toy_knife = [3,0,0,false], // [1][0] AT [0][1] Have it
    tough_glove = [5,0,0,false] // [2][0] AT [0][1] Have it
]
var armorFolder = [
    bandage = [0,0,0,true], // [0][0] DF [0][1] Have it
    faded_ribbon = [3,0,0,false], // [1][0] DF [0][1] Have it
    mainly_bandana = [5,0,0,false] // [2][0] DF [0][1] Have it
]
var you = [ // Player Stats on table
    "", // [0] Name
    stats = [ // [1] stats
    1, // [1][0] LV
    10, // [1][1] EXP Next
    0, // [1][2] AT
    0, // [1][3] DF
    0, // [1][4] HP
    0, // [1][5] LU
    0 // [1][6] Heal Boost
    ],
    inventory = [ // [2] Inventory
        "", // [2][0] food1
        "", // [2][1] food2
        "", // [2][2] food3
        "" // [2][3] food4
    ],
    equipped =[ // [3] Equipped
        0, // Weapon
        0, // Armor
    ]

]

var monster = [ // Monster Stats on table
    "", // [0] Name
    stats = [ // [1] stats
    1, // [1][0] LV
    0, // [1][1] AT
    0, // [1][2] DF
    0, // [1][3] HP
    0 // [1][4] LU
    ],
    reward = [ // [2] Reward
        0, // [2][0] EXP
        0, // [2][1] Gold
        0, // Weapon
        0 // Armor
    ],
    0, // [3] KR
    0 // [4] LinkedBattle
]

var interact = [
    "", // first interact
    "", // second interact
    "", // third interact
    "" // fourth interact
]

function guiding(newLocation) // Function for tp you to next html
{
document.location.href = newLocation;
}

function expCalculator() // EXP calculator
{
    you[1][1] = 10 + (15*(you[1][0]-1)) // EXP Required for next LV
    if (you[1][1] < exp)
    {
        exp -= you[1][1];
        you[1][0] += 1;
        if (you[1][0] % 4 != 0)
        {
            you[1][2] += 1;
        }
        else if (you[1][0] % 4 == 0)
        {
            you[1][3] += 1;
            you[1][4] += 4;
            player_HP += 4;
        }
    }
}

function dice(min,max,bns)
{
    return Math.round(Math.random(min,max)*max)+bns
}

function stat() // Set player stat
{
    you[1][4] = dice(1,6,6); // HP Value
    player_HP = you[1][4]; // Actual HP Value = MAX HP
    you[1][2] = dice(1,6,6); // AT Value
    you[1][5] = dice(1,6,6)+dice(1,6,6); // LU Value
    equipUpdt("weapon");
    equipUpdt("armor");
}

function randoDialog() // Trigger random dialogs
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

function updatingTurn()
{
    document.getElementById("HPBar").value = monster_HP;
    document.getElementById("HPBar").max = monster[1][3];
    document.getElementById("HPLabel").textContent = monster_HP+"/"+monster[1][3];
    document.getElementById("HPBarPlayer").value = player_HP;
    document.getElementById("HPBarPlayer").max = you[1][4];
    document.getElementById("HPLabelPlayer").textContent = player_HP+"/"+you[1][4];
    document.getElementById("LVPlayer").textContent = "LV "+you[1][0];
    document.getElementById("GoldPlayer").textContent = gold+" G"; 
    document.getElementById("ATPlayer").textContent = "AT "+you[1][2];
    document.getElementById("DFPlayer").textContent = "DF "+you[1][3];

}

function GaMover()
{
    if (player_KR > 0)
    {
        document.getElementById("KRPlayer").textContent = "KR";
        document.getElementById("HPBarPlayer").setAttribute("KR","true");
        player_KR -= 1;
        if (player_HP > 1)
        {
            player_HP -= 1;
        }
        if (player_KR == 0)
        {
            document.getElementById("HPBarPlayer").setAttribute("KR","false");
            document.getElementById("KRPlayer").textContent = "";
        }
    }
    if (player_HP <= 0)
    {
        player_HP = 0;

    }
}

function equipUpdt(from)
{
    if (from == "weapon")
    {
        you[1][2] -= weaponsFolder[you[3][0]][0];
        you[3][0] = monster[2][2];
        you[1][2] += weaponsFolder[monster[2][2]][0];
    }
    else if (from == "armor")
    {
        you[1][3] -= weaponsFolder[you[3][1]][0];
        you[3][1] = monster[2][3];
        you[1][3] += weaponsFolder[monster[2][3]][0];
    }
}

function updt()
{
    if (secretEncouter == false)
    {
        switch (stage) { // [0] Name, [1] LV AT DF HP LU, [2] EXP Gold Weapon Armor [3] KR [4] LinkedBattle
            case 1:
                monster = ["teste",[1,3,3,20,0],[15,3,1,0],0,0];
                interact = ["Olá Mundo!","Tristeza",":(","ABC"]
                ImageLink = "https://github.com/ermogenes/aulas-programacao-web/raw/master/content/000057.png";
            break;
            case 2:
                monster = ["irineu",[1,10,10,50,0,0,0],[15,3],5,0];
                interact = ["Lorem Ipmisus","","",""]
                ImageLink = "";
            break;
            default:
                monster = ["",[0,0,0,0,0],[0,0,0,0],0,0];
                interact = ["","","",""]
                ImageLink = "";
            break;
        }
    }
    firstEncouter = true;
    randoDialog();
    monster_HP = monster[1][3];
    monster_KR = 0;
    document.getElementById("Nm").textContent = monster[0];
    document.getElementById("Img").src = ImageLink;
    updatingTurn();
}
function dmg(){
    randoDialog();
    var at_Test = dice(1,6,you[1][2]);
    var df_Test = dice(1,6,monster[1][1]);
    var dmg = 0;
    if (at_Test > df_Test) 
    {
        document.getElementById("Img").setAttribute("damaged","true");
        dmg = you[1][2]-monster[1][2];
        if (dmg > 0)
        {
            monster_HP -= dmg;
        }
        setTimeout(function() {
            document.getElementById("Img").setAttribute("damaged","false");
        }, 250);
    }
    else
    {
        document.getElementById("mainBody").setAttribute("damaged","true");
        dmg = monster[1][1]-you[1][3];
        if (dmg > 0)
        {
            player_HP -= dmg;
        }
        player_KR += monster[3];
        setTimeout(function() {
            document.getElementById("mainBody").setAttribute("damaged","false");
        }, 250);
    }
    turns();
}

function turns()
{
    GaMover();
    updatingTurn();
    if (monster_HP <= 0){
        stage += 1;
        exp += monster[2][0];
        gold += monster[2][1];
        if (monster[2][2] > 0 && you[3][0] != monster[2][2])
        {
            weaponsFolder[monster[2][2]][1] = true;
            var question = confirm("Você deseja equipar a arma derrubada pelo monstro?");
            if (question == true)
            {
                equipUpdt("weapon");
            }  
        }
        else if (monster[2][2] > 0)
        {
            var question = confirm("Você deseja soltar a arma atual?");
            if (question == true)
            {
                monster[2][2] = 0;
                equipUpdt("weapon");
            }
        }
        if (monster[2][3] > 0  && you[3][1] != monster[2][3])
        {
            armorFolder[monster[2][3]][1] = true;
            var question = confirm("Você deseja equipar a armadura derrubada pelo monstro?");
            if (question == true)
            {
                equipUpdt("armor"); 
            }  
        }
        else if (monster[2][3] > 0)
        {
            var question = confirm("Você deseja soltar a armadura atual?");
            if (question == true)
            {
                monster[2][3] = 0;
                equipUpdt("armor");
            }
        }
        expCalculator();
        updt();
    }
}

function back()
{
    turns();
    stage = 1;
    updt();
}

function begin()
{
    stat();
    updt();
}