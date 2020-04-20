window.__require = function e(t, o, i) {
function n(c, s) {
if (!o[c]) {
if (!t[c]) {
var a = c.split("/");
a = a[a.length - 1];
if (!t[a]) {
var r = "function" == typeof __require && __require;
if (!s && r) return r(a, !0);
if (l) return l(a, !0);
throw new Error("Cannot find module '" + c + "'");
}
}
var u = o[c] = {
exports: {}
};
t[c][0].call(u.exports, function(e) {
return n(t[c][1][e] || e);
}, u, u.exports, e, t, o, i);
}
return o[c].exports;
}
for (var l = "function" == typeof __require && __require, c = 0; c < i.length; c++) n(i[c]);
return n;
}({
Block: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "89334GVgj1MkaQ0C/zPbcJf", "Block");
cc.Class({
extends: cc.Component,
properties: {
x: -1,
y: -1,
value: 0,
number: cc.Label,
sprite: cc.Sprite,
selected: cc.Sprite,
animationNode: cc.Sprite
},
onLoad: function() {},
setColorAndValue: function(e, t) {
this.value = t;
this.sprite.spriteFrame = e;
this.setNumber(t);
},
setNumber: function(e) {
this.number.string = e;
},
setSelected: function(e) {
this.selected.enabled = e;
e && this.animate();
},
animate: function() {
cc.tween(this.node).to(.08, {
scale: 1.06
}).to(.08, {
scale: 1
}).start();
}
});
cc._RF.pop();
}, {} ],
DialogBox: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "9c515QSqVdGj4bHCOMnzXYO", "DialogBox");
cc.Class({
extends: cc.Component,
properties: {
lblMessage: cc.RichText
},
showMessage: function(e) {
this.lblMessage.string = e;
this.show();
},
hide: function() {
this.node.active = !1;
},
show: function() {
this.node.active = !0;
}
});
cc._RF.pop();
}, {} ],
EndGame: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "83178yEnslO66ZUZISIERtM", "EndGame");
var i = e("DialogBox");
e("Loading");
cc.Class({
extends: cc.Component,
properties: {
score: {
default: null,
type: cc.Label
},
score2: {
default: null,
type: cc.Label
},
lblWelcome: {
default: null,
type: cc.Label
},
panelGuest: {
default: null,
type: cc.Node
},
panelAuthenticated: {
default: null,
type: cc.Node
},
dialogBox: {
default: null,
type: i
},
loading: {
default: null,
type: cc.Node
}
},
start: function() {
this.score.string = Global.newScore;
this.score2.string = Global.newScore;
Global.dialogBox = this.dialogBox;
Global.loading = this.loading;
if (Global.isLoggedIn()) {
this.panelGuest.active = !1;
this.panelAuthenticated.active = !0;
}
},
onLoginClicked: function() {
if (Global.isSamsungBlockchainSupported()) {
if (Global.isAndroid()) {
Global.getKeystore();
this.lblWelcome.string = "Welcome!";
}
this.panelGuest.active = !1;
this.panelAuthenticated.active = !0;
} else Global.showAlertDialog("Your phone does not have Samsung wallet support to store your record in Harmony blockchain");
},
onCreateKeystoreClicked: function() {
Global.isAndroid() && Global.gotoSamsungBlockchainKeystoreMenu();
},
onSaveClicked: function() {
Global.isAndroid() && Global.restUpdateScore();
},
onPlayAgainClicked: function() {
cc.director.loadScene("game");
},
onLeaderboardClicked: function() {
cc.director.loadScene("leader_board");
}
});
cc._RF.pop();
}, {
DialogBox: "DialogBox",
Loading: "Loading"
} ],
Entry: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "0eff6fHW9ZJqbcebTF5iL8z", "Entry");
cc.Class({
extends: cc.Component,
properties: {
rank: cc.Label,
key: cc.Label,
score: cc.Label,
medal: cc.Sprite,
tx: {
default: "",
visible: !1
}
},
setup: function(e, t, o, i, n) {
this.tx = n;
this.rank.string = e;
this.key.string = t;
this.score.string = o;
this.medal.spriteFrame = i;
this.node.on(cc.Node.EventType.TOUCH_END, this.onClick, this);
},
onClick: function() {
cc.sys.openURL("https://explorer.harmony.one/#/tx/" + this.tx);
}
});
cc._RF.pop();
}, {} ],
Game: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "918870dx+VCSJisaYjAnxgN", "Game");
var i = 0, n = 1, l = 2;
cc.Class({
extends: cc.Component,
properties: {
prefabBlock: {
default: null,
type: cc.Prefab
},
levelGenerator: {
default: null,
type: cc.Node
},
stopwatch: {
default: null,
type: cc.Node
},
numberBgArray: {
default: [],
type: cc.SpriteFrame
},
lblScore: cc.Label,
lblTime: cc.Label,
lblLevel: cc.Label,
btnPlay: cc.Button,
btnUndo: cc.Button,
lblError: {
default: null,
type: cc.Label
},
tutorialLine: {
default: null,
type: cc.Sprite
},
themeMusic: {
default: null,
type: cc.AudioClip
},
soundMove: {
default: null,
type: cc.AudioClip
},
soundCantMove: {
default: null,
type: cc.AudioClip
},
soundWin: {
default: null,
type: cc.AudioClip
},
soundButtonClick: {
default: null,
type: cc.AudioClip
}
},
state: i,
lastMove: null,
onLoad: function() {
this.nodeWidth = (this.node.width - 66) / 3;
this.nodeHeight = (this.node.height - 66) / 3;
this.generateAllLevels();
this._currentLevel = 0;
var e = this._allLevels[this._currentLevel];
this.instantiateBlocks(e);
this.reset();
null != this.themeMusic && cc.audioEngine.playMusic(this.themeMusic, !0);
},
generateAllLevels: function() {
var e = this.levelGenerator.getComponent("LevelGenerator");
this._allLevels = e.levels();
cc.log("[All Levels] ", this._allLevels);
},
instantiateBlocks: function() {
this.listBlockScripts = [];
for (var e = 0; e < 9; e++) {
var t = cc.instantiate(this.prefabBlock);
t.width = this.nodeWidth;
t.height = this.nodeHeight;
var o = e % 3, i = Math.floor(e / 3);
t.position = this.getNodePosition(o, i);
this.node.addChild(t);
var n = t.getComponent("Block");
n.x = o;
n.y = i;
this.listBlockScripts.push(n);
}
},
getNodePosition: function(e, t) {
var o = this.nodeWidth;
return cc.v2(18 * (t + 1) + o * t + o / 2, -(18 * (e + 1) + o * e + o / 2));
},
reset: function() {
this.state = i;
this.score = 0;
this._currentLevel = 0;
this._timer = 0;
var e = this._allLevels[this._currentLevel];
this.loadLevel(e);
this.disableTouch();
this.animatePlayButton();
},
loadLevel: function(e) {
Global.board_state = "";
Global.player_sequence = "";
for (var t = "", o = 0; o < e.contents.length; o++) {
var i = e.contents[o], n = o % 3, l = Math.floor(o / 3), c = this.findBlock(l, n);
c.setSelected(!1);
c.setColorAndValue(this.getSpriteByValue(i), i);
t += i;
}
Global.board_state = t;
this.selectedX = e.initialSelected.x;
this.selectedY = e.initialSelected.y;
cc.log("SELECTED " + this.selectedX + "-" + this.selectedY, "finding node...");
var s = this.findBlock(this.selectedX, this.selectedY);
null != s && s.setSelected(!0);
this.lblLevel.string = this._currentLevel + 1 + "/100";
this.btnUndo.interactable = !1;
null != this.tween4Stopwatch && this.tween4Stopwatch.stop();
this.isClockRinging = !1;
},
getSpriteByValue: function(e) {
var t = e % this.numberBgArray.length;
return this.numberBgArray[t];
},
enableTouch: function() {
this.node.parent.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
this.node.parent.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
},
disableTouch: function() {
this.node.parent.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
this.node.parent.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
},
onTouchStart: function(e) {
this.startPos = e.getLocation();
},
onTouchEnd: function(e) {
var t = e.getLocation(), o = t.x - this.startPos.x, i = t.y - this.startPos.y;
if (!(Math.abs(o) < 80 && Math.abs(i) < 80)) {
var n = void 0;
n = Math.abs(o) >= Math.abs(i) ? o > 0 ? "R" : "L" : i > 0 ? "U" : "D";
this.tryMove(n);
}
},
findBlock: function(e, t) {
for (var o = 0; o < this.listBlockScripts.length; o++) {
var i = this.listBlockScripts[o];
if (i.x == e && i.y == t) return i;
}
cc.log("findBlock: FAILED at index ", o);
},
tryMove: function(e) {
var t = !1, o = this.findBlock(this.selectedX, this.selectedY);
switch (e) {
case "U":
if (0 == this.selectedX) break;
this.selectedX--;
t = !0;
break;

case "D":
if (2 == this.selectedX) break;
this.selectedX++;
t = !0;
break;

case "L":
if (0 == this.selectedY) break;
this.selectedY--;
t = !0;
break;

case "R":
if (2 == this.selectedY) break;
this.selectedY++;
t = !0;
}
if (t) {
if (this.btnPlay.enabled) {
this.btnPlay.node.active = !1;
this.btnUndo.node.active = !0;
this.tutorialLine.enabled = !1;
this.state = n;
}
Global.player_sequence += e;
this.lastMove = e;
this.btnUndo.interactable = !0;
var i = this.findBlock(this.selectedX, this.selectedY), l = i.value + 1;
i.setColorAndValue(this.getSpriteByValue(l), l);
o.setSelected(!1);
i.setSelected(!0);
this.playMoveSound();
if (this.isPlayerWin()) {
cc.audioEngine.playEffect(this.soundWin);
this.score += this.calculateScore();
this.lblScore.string = this.score;
this.gotoNextLevel();
}
} else {
o.animate();
this.playInvalidMoveSound();
}
},
gotoNextLevel: function() {
this._currentLevel++;
this._timer = this.getTimeByLevel(this._currentLevel);
this.lblLevel.string = this._currentLevel + 1 + "/100";
var e = this._allLevels[this._currentLevel];
this.loadLevel(e);
},
calculateScore: function() {
return (this._currentLevel + 1) * Math.floor(this._timer);
},
getTimeByLevel: function(e) {
return e <= 2 ? 20 : e <= 5 ? 30 : e <= 10 ? 25 : e <= 20 ? 20 : 15;
},
isPlayerWin: function() {
for (var e = this.listBlockScripts[0].value, t = 1; t < this.listBlockScripts.length; t++) if (this.listBlockScripts[t].value != e) return !1;
return !0;
},
playMoveSound: function() {
null != this.soundMove && cc.audioEngine.playEffect(this.soundMove);
},
playInvalidMoveSound: function() {
null != this.soundCantMove && cc.audioEngine.playEffect(this.soundCantMove);
},
onPlayClicked: function() {
this.enableTouch();
this.tween4PlayButton.stop();
this.btnPlay.node.scale = 1;
this._timer = this.getTimeByLevel(this._currentLevel);
cc.audioEngine.playEffect(this.soundButtonClick);
this.findBlock(this.selectedX, this.selectedY).animate();
},
onUndoClicked: function() {
if (null != this.lastMove) {
var e = this.findBlock(this.selectedX, this.selectedY), t = e.value - 1;
e.setColorAndValue(this.getSpriteByValue(t), t);
e.setSelected(!1);
switch (this.lastMove) {
case "U":
this.selectedX++;
break;

case "D":
this.selectedX--;
break;

case "L":
this.selectedY++;
break;

case "R":
this.selectedY--;
}
var o = Global.player_sequence;
o = o.substring(o.length - 1);
Global.player_sequence = o;
this.lastMove = null;
this.findBlock(this.selectedX, this.selectedY).setSelected(!0);
this.btnUndo.interactable = !1;
}
},
animatePlayButton: function() {
var e = this;
this.tween4PlayButton = cc.tween(this.btnPlay.node).to(.5, {
scale: 1.2
}).to(.5, {
scale: 1
}).call(function() {
e.animatePlayButton();
}).start();
},
isClockRinging: !1,
update: function(e) {
if (this.state != i && this.state != l) {
this._timer -= e;
if (this._timer > 0) {
var t = ("0" + Math.floor(this._timer)).slice(-2);
this.lblTime.string = "00:" + t;
if (this._timer <= 10 && !this.isClockRinging) {
this.tween4Stopwatch = cc.tween(this.stopwatch).repeat(10, cc.tween().by(.5, {
angle: -20
}).by(.5, {
angle: 20
})).start();
this.isClockRinging = !0;
}
} else {
Global.newScore = this.score;
cc.director.loadScene("end_game");
this.state = l;
}
}
}
});
cc._RF.pop();
}, {} ],
Global: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "9bf09yemltMJ6LDPqxBrroN", "Global");
e("DialogBox");
window.Global = {
myKeystore: "",
newScore: 0,
board_state: "",
player_sequence: "",
dialogBox: null,
loading: null,
isAndroid: function() {
return cc.sys.os == cc.sys.OS_ANDROID;
},
isLoggedIn: function() {
var e = localStorage.getItem("my_keystore");
return null != e && e.length > 10;
},
getKeystore: function() {
this.myKeystore = jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "getKeystore", "()Ljava/lang/String;");
localStorage.setItem("my_keystore", this.myKeystore);
return this.myKeystore;
},
logout: function() {
localStorage.setItem("my_keystore", "");
},
getScore: function() {
return jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "getScore", "()I");
},
updateScore: function() {
if (!(this.newScore <= 0)) {
this.getScore();
this.newScore;
}
},
getLeaderboard: function() {
return jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "getLeaderboard", "()Ljava/lang/String;");
},
showAlertDialog: function(e) {
Global.dialogBox.showMessage(e);
},
gotoSamsungBlockchainKeystoreMenu: function() {
return jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "gotoSamsungBlockchainKeystoreMenu", "()V");
},
isSamsungBlockchainSupported: function() {
return jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "isSamsungBlockchainSupported", "()Z");
},
isInternetConnectionAvailable: function() {
return jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "isInternetConnectionAvailable", "()Z");
},
restUpdateScore: function() {
var e = "address=" + this.myKeystore + "&score=" + this.newScore + "&board_state=" + this.board_state + "&sequence=" + this.player_sequence;
cc.log("PARAMZ ", e);
var t = new XMLHttpRequest();
t.open("POST", "http://54.212.193.72:3000/api/submit", !0);
t.timeout = 15e3;
t.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
null != Global.loading && (Global.loading.active = !0);
t.onreadystatechange = function() {
null != Global.loading && (Global.loading.active = !1);
if (4 === this.readyState && 200 === this.status) {
var e = JSON.parse(t.responseText);
cc.log("RESP", t.responseText);
if ("success" === e.status) {
var o = e.tx;
o.length > 10 && (o = o.substring(0, 10) + "...");
var i = Global.player_sequence;
i.length > 10 && (i = i.substring(0, 10) + "...");
var n = Global.board_state;
n.length > 10 && (n = n.substring(0, 10) + "...");
var l = "<color=#FFC530>Your score Saved!<c> \n <color=#131475>Txn:</c>" + o + "\n <color=#131475>BOARD:</c> " + n + "\n <color=#131475>SEQ.</c> " + i;
Global.showAlertDialog(l);
} else {
Global.showAlertDialog("Failed to save score! \n Please try again.");
}
}
};
t.onerror = function() {
null != Global.loading && (Global.loading.active = !1);
Global.showAlertDialog("Networking problem \n Failed to save your score");
};
t.ontimeout = function(e) {
null != Global.loading && (Global.loading.active = !1);
Global.showAlertDialog("Network: Request timeout.");
};
t.send(e);
},
restGetLeaderBoard: function(e) {
var t = new XMLHttpRequest();
t.open("GET", "http://54.212.193.72:3000/api/leader_boards", !0);
t.timeout = 5e3;
null != Global.loading && (Global.loading.active = !0);
t.onreadystatechange = function() {
null != Global.loading && (Global.loading.active = !1);
if (4 == t.readyState && t.status >= 200 && t.status < 400) {
var o = t.responseText;
if ("success" === JSON.parse(t.responseText).status) e(o); else {
Global.showAlertDialog("Unable to get \n Leader Board! \n Please try again.");
}
}
};
t.onerror = function() {
null != Global.loading && (Global.loading.active = !1);
Global.showAlertDialog("Unable to get leader board!");
};
t.send(null);
}
};
cc._RF.pop();
}, {
DialogBox: "DialogBox"
} ],
Leadearboard: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "e4231kRB6FO7qKfwfFVqxPB", "Leadearboard");
cc.Class({
extends: cc.Component,
properties: {
entriesRoot: cc.Node,
prefabEntry: cc.Prefab,
medalSprites: {
default: [],
type: cc.SpriteFrame
},
loading: {
default: null,
type: cc.Node
}
},
start: function() {
var e = "", t = null;
Global.isAndroid();
var o = this;
Global.loading = this.loading;
Global.restGetLeaderBoard(function(i) {
e = i;
var n = JSON.parse(e);
cc.log("json string", e);
t = n.leaders;
cc.log("Entries", t);
t.sort(function(e, t) {
return e.score > t.score ? -1 : 1;
});
var l = 1;
t.forEach(function(e) {
var t = cc.instantiate(o.prefabEntry), i = t.getComponent("Entry"), n = o.medalSprites[o.medalSprites.length - 1];
1 != l && 2 != l || (n = o.medalSprites[l - 1]);
var c = e.address.slice(0, 10) + "...", s = "0x0816c249e4ecc3f9992044a8aaa4cc13cb3a5465a35cc52b5804b98170d77040";
void 0 != e.txn && null != e.txn && (s = e.txn);
i.setup(l, c, e.score, n, s);
o.entriesRoot.addChild(t);
l++;
});
});
},
onPlayAgainClicked: function() {
cc.director.loadScene("game");
},
onBackClicked: function() {
cc.director.loadScene("end_game");
}
});
cc._RF.pop();
}, {} ],
LevelGenerator: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "3ffbfo+zY9GiJgho3eM08Wb", "LevelGenerator");
cc.Class({
extends: cc.Component,
randRange: function(e, t) {
return Math.floor(Math.random() * (t - e) + e);
},
getDifficulty: function(e) {
return 1 == e ? 1 : e >= 2 && e <= 3 ? 2 : e >= 4 && e <= 5 ? 3 : e >= 6 && e <= 7 ? 4 : e >= 8 && e <= 10 ? 5 : e >= 11 && e <= 20 ? 7 : e >= 21 && e <= 40 ? 8 : e >= 41 && e <= 60 ? 9 : e >= 61 && e <= 80 ? 10 : e >= 81 && e <= 90 ? 11 : e >= 91 && e <= 95 ? 12 : 96 == e ? 13 : 97 == e ? 14 : 98 == e ? 15 : 99 == e ? 16 : 17;
},
possible: function(e, t, o) {
return -1 != o && ((0 != o || 0 != Math.floor(t / 3)) && ((1 != o || 2 != Math.floor(t / 3)) && ((2 != o || t % 3 != 0) && (3 != o || t % 3 != 2))));
},
levels: function() {
for (var e, t = new Array(100), o = 1; o < 101; o++) {
var i = 3 * (e = this.getDifficulty(o)), n = 4 * e, l = o + 3, c = this.randRange(i, n), s = {}, a = [];
if (1 == o) {
a = [ 1, 0, 0, 1, 1, 0, 1, 1, 0 ];
s.contents = a;
s.initialSelected = {};
s.initialSelected.x = 0;
s.initialSelected.y = 0;
t[o - 1] = s;
} else {
for (var r = 0; r < 9; r++) a.push(l);
var u = this.randRange(0, 9), d = [];
a[u] -= 1;
for (r = 0; r < c; r++) {
var h = -1;
do {
h = this.randRange(0, 4);
} while (!this.possible(a, u, h));
switch (h) {
case 0:
u -= 3;
d.push('"d"');
r + 1 != c && (a[u] -= 1);
break;

case 1:
u += 3;
d.push('"u"');
r + 1 != c && (a[u] -= 1);
break;

case 2:
u -= 1;
d.push('"r"');
r + 1 != c && (a[u] -= 1);
break;

case 3:
u += 1;
d.push('"l"');
r + 1 != c && (a[u] -= 1);
}
}
var p = u % 3, f = Math.floor(u / 3);
d = d.reverse();
s.contents = a;
s.initialSelected = {};
s.initialSelected.x = f;
s.initialSelected.y = p;
t[o - 1] = s;
}
}
return t;
}
});
cc._RF.pop();
}, {} ],
Loading: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "0ab5fsWe1ZMhp4pZYuuNkS+", "Loading");
cc.Class({
extends: cc.Component,
properties: {
icon: cc.Sprite
},
onEnable: function() {
var e = cc.repeatForever(cc.rotateBy(1, 360).easing(cc.easeIn(3)));
this.icon.node.runAction(e);
}
});
cc._RF.pop();
}, {} ],
SplashScript: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "280c3rsZJJKnZ9RqbALVwtK", "SplashScript");
cc.Class({
extends: cc.Component,
onLoad: function() {
var e = cc.delayTime(1.5), t = cc.sequence(e, cc.callFunc(this.loadGameScene.bind(this)));
this.node.runAction(t);
Global.logout();
},
loadGameScene: function() {
cc.director.loadScene("game");
},
update: function(e) {}
});
cc._RF.pop();
}, {} ]
}, {}, [ "Block", "DialogBox", "EndGame", "Entry", "Game", "Global", "Leadearboard", "LevelGenerator", "Loading", "SplashScript" ]);