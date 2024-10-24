import {addAdvDesc} from './advdesccfg/entry.js'
import {addChat} from './chatdesc/chat_ui_adder.js'
try{addAdvDesc()}catch{}
try{addChat()}catch{}
window["rpgStats_genIntercept"] = function(chat){
}