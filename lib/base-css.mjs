// Shared design system, extracted from the launch reel (build.mjs).
export const BASE_CSS = (fontFaces) => `
${fontFaces}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1080px;height:1920px;overflow:hidden;background:#F3EEE5}
#root{position:relative;width:100%;height:100%;overflow:hidden;font-family:"Poppins",sans-serif;color:#161514}
.clip{position:absolute;inset:0}
.mono{font-family:"JetBrains Mono",monospace;font-weight:500;color:#8B8579;letter-spacing:.06em}
.small{font-size:24px}.xs{font-size:21px}
.serif{font-family:"Lora",serif}
.violet{color:#7C3AED!important}.green{color:#16A34A}.neg{color:#E11D48!important}
.h2{font-size:44px;font-weight:700;letter-spacing:-.01em;line-height:1.15}

/* scene wrappers, transitions */
.sIn,.cam{position:absolute;inset:0}
.sIn{will-change:transform,filter}
#wipe{z-index:50;overflow:hidden;pointer-events:none}
#wipe .bar{position:absolute;top:-10%;height:120%;left:-30%;width:160%;transform:skewX(-14deg)}
#wipe .b1{background:#7C3AED}#wipe .b2{background:#161514}#wipe .b3{background:#C4B5FD}
#flash{z-index:60;background:#fff;opacity:0;pointer-events:none}
.redFlash{position:absolute;inset:0;background:radial-gradient(80% 60% at 50% 40%,rgba(225,29,72,.55),rgba(225,29,72,0) 70%);opacity:0;z-index:25}
.goldFlash{position:absolute;inset:0;background:radial-gradient(70% 50% at 50% 35%,rgba(22,163,74,.35),rgba(22,163,74,0) 70%);opacity:0;z-index:25}

/* background */
#bg{background:#F3EEE5}
#bg .grid{position:absolute;inset:0;background-image:linear-gradient(rgba(70,50,30,.055) 2px,transparent 2px),linear-gradient(90deg,rgba(70,50,30,.055) 2px,transparent 2px);background-size:60px 60px;background-position:-1px -1px}
#bg .wash{position:absolute;border-radius:50%;filter:blur(110px)}
#bg .peach{width:900px;height:800px;left:-320px;top:-260px;background:#FFC9A3;opacity:.55}
#bg .lav{width:950px;height:900px;right:-360px;bottom:-200px;background:#D9CCFF;opacity:.6}

/* labels */
.labels{position:absolute;left:0;right:0;top:1296px;display:flex;flex-direction:column;align-items:center;gap:14px;z-index:20}
.lab{display:block;font-family:"JetBrains Mono",monospace;font-weight:500;font-size:42px;line-height:1.2;letter-spacing:.13em;text-transform:uppercase;padding:12px calc(26px - .13em) 12px 26px;border-radius:10px;background:#161514;color:#F6F2EA;box-shadow:0 10px 24px -10px rgba(40,25,10,.35);opacity:0}
.lab.key{background:#7C3AED;color:#fff;box-shadow:0 12px 28px -10px rgba(124,58,237,.55)}

/* cards */
.stage{position:absolute;left:0;right:0;top:300px;height:960px;display:flex;align-items:center;justify-content:center}
.stage.col{flex-direction:column;gap:30px}
.card{position:relative;background:#FFFDF9;border:2px solid #E7E0D4;border-radius:28px;box-shadow:0 1px 0 rgba(255,255,255,.9) inset,0 28px 60px -30px rgba(100,65,30,.28),0 4px 12px -4px rgba(100,65,30,.06)}
.cardHead{margin-bottom:22px}
.badge{display:inline-block;font-weight:600;font-size:34px;padding:12px 28px;border-radius:999px}
.badge.ok{background:#DCFCE7;color:#16A34A;border:2px solid #BBF7D0}
.tvBadge{display:flex;align-items:center;gap:14px;padding:12px 20px 12px 14px;border:2px solid #E7E0D4;border-radius:18px;background:#fff}
.tvIco{width:48px;height:48px;padding:9px;border-radius:12px;background:#F3EEE5;flex:none}
.tvTop{font-size:16px;letter-spacing:.14em}
.tvName{font-size:26px;font-weight:600;line-height:1.1}
.pill{padding:10px 20px;border:2px solid #E7E0D4;border-radius:999px;font-size:22px;color:#5c564d;background:#FBF8F3;height:max-content}

/* mascot */
.mascot{position:absolute;width:98px;height:112px;z-index:15}
.mBody{position:absolute;left:0;top:0;width:98px;height:105px}
.mBody svg{width:98px;height:105px;display:block}
.mShadow{position:absolute;left:14px;bottom:-4px;width:70px;height:12px;border-radius:50%;background:rgba(60,30,10,.16)}
.onCard{right:-30px;bottom:-40px}

/* scene 1 hero */
.hero{position:absolute;left:0;right:0;top:1120px;display:flex;flex-direction:column;align-items:center;gap:18px;z-index:20}
.hl{position:relative;display:block;font-family:"JetBrains Mono",monospace;font-weight:700;text-transform:uppercase;letter-spacing:.08em;border-radius:14px;padding:14px calc(30px - .08em) 14px 30px;background:#161514;color:#F6F2EA;font-size:60px;line-height:1.15;box-shadow:0 16px 34px -14px rgba(40,25,10,.45)}
.hl2{background:#7C3AED;color:#fff;font-size:100px;box-shadow:0 20px 44px -14px rgba(124,58,237,.6)}
.strike{position:absolute;left:22px;right:22px;top:50%;height:14px;margin-top:-7px;background:#E11D48;border-radius:7px;transform-origin:left center;box-shadow:0 4px 12px rgba(225,29,72,.45)}

/* logos */
.lg{display:block;width:100%;height:100%;object-fit:contain}
.blogo.img{padding:10px;border:2px solid #EFE8DC}

/* scene 1 */
.s1wrap{position:absolute;left:0;right:0;top:300px;height:960px}
.mons{position:absolute;left:0;right:0;top:220px;display:flex;justify-content:center;align-items:flex-end;gap:14px;perspective:1400px}
.mon{display:flex;flex-direction:column;align-items:center}
.mon1{transform:rotateY(24deg);transform-origin:right bottom}
.mon3{transform:rotateY(-24deg);transform-origin:left bottom}
.bezel{background:#1B1C1F;padding:12px;border-radius:16px;box-shadow:0 30px 50px -20px rgba(0,0,0,.5),inset 0 0 0 2px #2a2b30}
.scr{position:relative;background:#050608;border-radius:6px;overflow:hidden}
.scrIn{position:absolute;inset:0;background:radial-gradient(120% 90% at 50% 0%,#1a0d12,#0b0d10 70%);padding:14px 16px}
.scrHead{display:flex;justify-content:space-between;font-family:"JetBrains Mono",monospace;font-weight:700;font-size:19px;color:#cfd2d8;margin-bottom:10px}
.scrHead .neg{color:#FB3B5C!important}
.scrChart{position:absolute;left:0;bottom:0}
.crt{position:absolute;left:0;right:0;top:50%;height:4px;margin-top:-2px;background:#fff;box-shadow:0 0 18px 6px rgba(255,255,255,.7);opacity:0}
.neck{width:34px;height:46px;background:linear-gradient(90deg,#2a2b30,#3a3b41,#2a2b30)}
.mon1 .neck,.mon3 .neck{height:30px}
.mon .foot{width:150px;height:14px;border-radius:8px 8px 3px 3px;background:#2a2b30}
.desk{position:absolute;left:60px;right:60px;top:596px;height:70px;border-radius:14px 14px 6px 6px;box-shadow:0 40px 60px -30px rgba(80,45,15,.45)!important;background:repeating-linear-gradient(178deg,rgba(255,255,255,.035) 0 3px,transparent 3px 19px),linear-gradient(180deg,#B07A4E,#8D5B37 60%,#6F4527);box-shadow:0 -2px 0 rgba(255,255,255,.25) inset}
.deskTop{position:absolute;left:0;right:0;top:0;height:18px;background:linear-gradient(180deg,#C9915F,#A06D44)}
.m1{left:850px;top:552px}

/* scene 2 */
.win{width:900px;padding:0 0 46px}
.titlebar{display:flex;align-items:center;gap:12px;height:70px;padding:0 28px;border-bottom:2px solid #EFE8DC}
.titlebar i{width:18px;height:18px;border-radius:50%;background:#EAD9C8}
.titlebar i:nth-child(2){background:#EEE2C4}.titlebar i:nth-child(3){background:#D8E6CF}
.titlebar span{margin-left:auto;font-size:20px}
.s2body{position:relative;display:flex;justify-content:space-between;align-items:center;padding:80px 70px 40px}
.tile{width:250px;height:250px;border-radius:40px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;box-shadow:0 22px 40px -18px rgba(60,35,10,.35)}
.tClaude{background:#EFE5D6;border:2px solid #E2D4BF}
.tCubrik{background:#161514}
.tIcon{width:110px;height:110px}.tIcon svg{width:100%;height:100%}
.tName{font-size:44px;font-weight:600;color:#fff;line-height:1}
.tClaude .tName{color:#2B2520;font-weight:600;font-family:"Lora",serif;font-size:46px}
.link{position:absolute;left:320px;top:40px;width:260px;height:140px;overflow:visible}
.s2foot{display:flex;flex-direction:column;align-items:center;gap:18px}

/* scene 3 */
.s3card{width:900px;padding:34px 40px 40px}
.bubbleRow{display:flex;justify-content:flex-end;margin-bottom:30px}
.uBubble{min-height:84px;background:#161514;color:#F6F2EA;font-size:38px;font-weight:500;padding:18px 30px;border-radius:30px 30px 8px 30px;display:flex;align-items:center}
.ch{display:none}
.cursor{display:inline-block;width:4px;height:42px;background:currentColor;margin-left:4px}
.reply{display:flex;gap:20px;align-items:flex-start}
.avatar{flex:none;width:72px;height:72px;border-radius:20px;background:#161514;padding:12px}
.avatar svg{width:100%;height:100%;display:block}
.replyCard{flex:1;background:#F8F4ED;border:2px solid #EFE8DC;border-radius:24px;padding:24px 26px;display:flex;flex-direction:column;gap:16px}
.replyTitle{font-size:30px;font-weight:500;color:#5c564d}
.brow{display:flex;align-items:center;gap:20px;background:#FFFDF9;border:2px solid #EFE8DC;border-radius:20px;padding:14px 18px}
.blogo{flex:none;width:74px;height:74px;border-radius:18px;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:32px}
.bname{flex:1;font-size:36px;font-weight:600;line-height:1.2}
.bname .small{font-size:19px;margin-top:4px}
.chk{flex:none;width:56px;height:56px;border-radius:50%;background:#16A34A;color:#fff;font-size:32px;font-weight:700;display:flex;align-items:center;justify-content:center}
.s3foot{margin-top:24px;text-align:center}

/* scene 4 */
.s4{gap:34px}
.vcard{width:920px;padding:20px 20px 26px}
.thumb{position:relative;height:500px;border-radius:20px;overflow:hidden;background:#0b0b0d}
.thumbImg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transform-origin:70% 40%}
.thumbShade{position:absolute;inset:0;background:linear-gradient(100deg,rgba(0,0,0,.75) 0%,rgba(0,0,0,.35) 42%,rgba(0,0,0,0) 60%)}
.thumbTitle{position:absolute;left:34px;top:28px;font-size:84px;font-weight:800;color:#fff;letter-spacing:-.02em;line-height:.95;text-shadow:0 6px 0 rgba(0,0,0,.55),0 0 30px rgba(0,0,0,.6);text-transform:uppercase}
.thumbTitle div{display:block}
.gold{color:#FACC15}
.ytPlay{position:absolute;left:50%;top:50%;width:150px;height:106px;margin:-53px 0 0 -75px;filter:drop-shadow(0 12px 24px rgba(0,0,0,.5))}
.ytPlay img{width:100%;height:100%;display:block}
.dur{position:absolute;right:16px;bottom:16px;background:rgba(0,0,0,.8);color:#fff!important;font-size:24px;padding:4px 12px;border-radius:8px}
.vmeta{display:flex;gap:20px;align-items:center;padding:24px 8px 0}
.chAv{flex:none;width:72px;height:72px;border-radius:50%;background:linear-gradient(135deg,#FACC15,#D97706);color:#fff;font-weight:800;font-size:34px;display:flex;align-items:center;justify-content:center}
.vtitle{font-size:34px;font-weight:600;line-height:1.25;margin-bottom:6px}
.vactions{display:flex;gap:14px;padding:22px 8px 0}
.act{position:relative;height:64px;padding:0 26px;border-radius:999px;background:#F3EEE5;border:2px solid #EFE8DC;display:flex;align-items:center;font-size:27px;font-weight:600;color:#3d3832}
.copy{min-width:250px;justify-content:center}
.cp1,.cp2{position:absolute;inset:0;display:flex;align-items:center;justify-content:center}
.cp2{opacity:0}
.h4{left:420px;bottom:-80px}
.toast{background:#161514;color:#F6F2EA;font-size:32px;font-weight:600;padding:18px 34px;border-radius:999px;box-shadow:0 18px 40px -16px rgba(0,0,0,.45);opacity:0}

/* chat header (scenes 3 and 5) */
.chatHead{display:flex;align-items:center;gap:14px;padding-bottom:14px;margin-bottom:16px;border-bottom:2px solid #F1EBE1}
.chatHead .lg{width:46px;height:46px}
.chName{font-size:36px;font-weight:600;color:#2B2520}
.conn{margin-left:auto;display:flex;align-items:center;gap:10px;font-size:22px;font-weight:600;color:#5c564d;background:#F3EEE5;border:2px solid #EFE8DC;border-radius:999px;padding:8px 18px 8px 10px}
.conn i{display:block;width:34px;height:34px;border-radius:10px;background:#161514;padding:6px}
.conn svg{display:block;width:100%;height:100%}

/* scene 5 */
.s5card{width:920px;padding:24px 32px 24px}
.linkBubble{display:flex;gap:18px;align-items:center;background:#161514;color:#F6F2EA;border-radius:26px 26px 8px 26px;padding:14px 22px 14px 14px;max-width:700px;opacity:0}
.linkBubble img{width:150px;height:84px;object-fit:cover;border-radius:12px;flex:none}
.lbT{font-size:26px;font-weight:600;line-height:1.2}
.lbU{font-family:"JetBrains Mono",monospace;font-size:19px;color:#a8a29a;margin-top:4px}
.s5card .bubbleRow{margin-bottom:12px}
.analyze{background:#F8F4ED;border:2px solid #EFE8DC;border-radius:20px;padding:12px 18px;margin-bottom:8px;opacity:0}
.anHead{position:relative;display:flex;align-items:center;gap:14px;height:40px;font-size:28px;font-weight:600}
.spin{width:30px;height:30px;border-radius:50%;border:4px solid #DDD6FE;border-top-color:#7C3AED;flex:none}
.anDone{position:absolute;left:0;top:0;height:40px;display:flex;align-items:center;color:#16A34A;opacity:0}
.steps{display:flex;gap:12px;margin-top:8px}
.st{font-size:22px;font-weight:600;color:#16A34A;background:#F0FDF4;border:2px solid #BBF7D0;border-radius:999px;padding:6px 16px;opacity:0}
.rules{margin-bottom:8px}
.rule{position:relative;display:flex;align-items:center;gap:22px;padding:9px 6px;border-top:2px solid #F1EBE1;min-height:60px;opacity:0}
.rk{flex:none;width:150px;font-weight:700;font-size:24px;color:#7C3AED!important;letter-spacing:.12em}
.rv{font-size:31px;font-weight:500;display:flex;flex-wrap:wrap}
.loop{position:absolute;left:-22px;top:-22px;width:860px;height:110px;overflow:visible}
.agentBar{display:flex;align-items:center;gap:18px;background:#F0FDF4;border:2px solid #86EFAC;border-radius:22px;padding:12px 16px;margin-bottom:12px;opacity:0}
.agChk{flex:none;width:56px;height:56px;border-radius:50%;background:#16A34A;color:#fff;font-size:30px;font-weight:700;display:flex;align-items:center;justify-content:center}
.agT{font-size:32px;font-weight:700;color:#14532D}
.agTx .xs{color:#4d7c5b!important;margin-top:2px}
.agBtn{margin-left:auto;background:#161514;color:#fff;font-size:26px;font-weight:600;padding:12px 26px;border-radius:14px}
.composer{display:flex;align-items:center;gap:14px}
.cmpIn{position:relative;flex:1;height:68px;border-radius:20px;background:#F8F4ED;border:2px solid #EFE8DC;display:flex;align-items:center;padding:0 22px}
.ph{font-size:28px;color:#a39d93}
.pasted{position:absolute;left:14px;top:12px;bottom:12px;display:flex;align-items:center;gap:10px;background:#fff;border:2px solid #DDD6FE;border-radius:12px;padding:0 16px 0 10px;font-family:"JetBrains Mono",monospace;font-size:22px;color:#161514;opacity:0}
.pasted .lg{width:38px;height:27px}
.send{flex:none;width:68px;height:68px;border-radius:20px;background:#D97757;color:#fff;font-size:40px;font-weight:700;display:flex;align-items:center;justify-content:center}
.keycap{position:absolute;left:330px;bottom:92px;background:#161514;color:#fff!important;font-size:30px;font-weight:700;padding:10px 20px;border-radius:14px;box-shadow:0 8px 0 #000,0 14px 24px -6px rgba(0,0,0,.4);opacity:0;z-index:5}

/* scene 6 */
.s6card{width:920px;padding:38px 36px 40px}
.s6head{display:flex;align-items:center;gap:14px;margin-bottom:26px}
.s6head .lg{width:44px;height:44px}
.pos{color:#16A34A}
.grid{display:grid;grid-template-columns:1fr 1fr;gap:18px}
.chip{position:relative;display:flex;align-items:center;gap:18px;background:#FBF8F3;border:2px solid #EFE8DC;border-radius:22px;padding:22px 22px;min-height:108px}
.cIco{flex:none;width:64px;height:64px;border-radius:16px;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:24px;color:#161514!important;letter-spacing:0}
.cName{font-size:32px;font-weight:600;line-height:1.15}
.chip .xs{margin-top:4px}
.own{border:2px dashed #7C3AED;background:#F5F1FF}
.own .cIco{color:#fff!important}
.ring{position:absolute;inset:-10px;border:5px solid #7C3AED;border-radius:30px;opacity:0}

/* scene 7 */
.s7card{width:900px;padding:38px 44px 40px}
.s7head{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:26px}
.eq{width:800px;height:340px;display:block}
.years{display:flex;justify-content:space-between;margin:10px 0 28px}
.stats{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
.stat{background:#FBF8F3;border:2px solid #EFE8DC;border-radius:20px;padding:20px 22px}
.sv{font-size:54px;font-weight:700;letter-spacing:-.02em;margin-top:6px}

/* scene 8 */
.s8card{width:900px;padding:42px 46px 40px}
.s8top{display:flex;align-items:center;gap:20px;margin-bottom:8px}
.dotWrap{position:relative;width:30px;height:30px;flex:none}
.dot,.dotRing{position:absolute;inset:0;border-radius:50%;background:#16A34A}
.dotRing{opacity:.35}
.live{margin-left:auto;background:#DCFCE7;color:#16A34A!important;font-weight:700;font-size:26px;padding:8px 20px;border-radius:999px;border:2px solid #BBF7D0}
.clockRow{display:flex;align-items:center;gap:26px;margin:44px 0 6px}
.moon{font-size:96px;line-height:1}
.clock{position:relative;width:440px;height:160px}
.ck{position:absolute;left:0;top:0;font-size:150px;font-weight:700;letter-spacing:-.03em;line-height:160px;font-variant-numeric:tabular-nums;opacity:0}
.ck0{opacity:1}
.asleep{font-family:"Lora",serif;font-style:italic;font-weight:500;font-size:44px;color:#8B8579;margin:0 0 36px 124px}
.s8foot{padding-right:60px;display:flex;justify-content:space-between;align-items:center;border-top:2px solid #F1EBE1;padding-top:24px;font-size:22px}
.pnl{font-family:"Poppins",sans-serif;font-weight:700;font-size:34px;color:#16A34A;letter-spacing:0;opacity:0}
.notif{position:absolute;left:44px;right:44px;top:150px;display:flex;gap:24px;align-items:center;padding:26px 30px;border-radius:40px;background:rgba(28,28,30,.95);box-shadow:0 30px 60px -20px rgba(0,0,0,.5);z-index:30;opacity:0}
.nIco{flex:none;width:92px;height:92px;border-radius:22px;background:#161514;padding:14px;border:2px solid #333}
.nIco svg{width:100%;height:100%;display:block}
.nTxt{flex:1;color:#fff}
.nTop{display:flex;justify-content:space-between;font-size:28px;font-weight:600;color:#d9d9de}
.nNow{font-weight:400;color:#8e8e93}
.nMain{font-size:36px;font-weight:600;margin-top:2px}
.nSub{font-size:28px;color:#b8b8bd;margin-top:2px}

/* scene 9 */
.s9card{width:900px;padding:44px 46px 46px}
.s9head{display:flex;gap:24px;align-items:center;margin-bottom:26px}
.s9head .h2{font-size:50px}
.s9txt{font-size:36px;color:#4f4a43;line-height:1.55;margin-bottom:40px}
.summary{background:#FBF8F3;border:2px solid #EFE8DC;border-radius:18px;padding:18px 24px;margin-bottom:34px;display:flex;flex-direction:column;gap:8px}
.summary div{display:flex;justify-content:space-between}
.summary b{color:#161514;font-weight:700}
.btns{display:grid;grid-template-columns:1fr 1.3fr;gap:20px}
.btn{position:relative;height:116px;border-radius:26px;display:flex;align-items:center;justify-content:center;font-size:40px;font-weight:600;overflow:hidden}
.cancel{background:#F3EEE5;border:2px solid #E7E0D4;color:#5c564d}
.confirm{background:#161514;color:#fff}
.bt1,.bt2{position:absolute;inset:0;display:flex;align-items:center;justify-content:center}
.bt2{opacity:0}
.ripple{position:absolute;left:50%;top:50%;width:80px;height:80px;margin:-40px 0 0 -40px;border-radius:50%;background:rgba(255,255,255,.45);opacity:0}
.hand{position:absolute;right:250px;bottom:-20px;font-size:120px;line-height:1;z-index:16;opacity:0}

/* scene 10 */
.endWrap{position:absolute;left:0;right:0;top:330px;display:flex;flex-direction:column;align-items:center}
.endCard{width:860px;padding:60px 40px 66px;display:flex;flex-direction:column;align-items:center;gap:22px}
.cmt{font-size:128px;font-weight:800;letter-spacing:-.03em;line-height:1}
.cpill{background:#7C3AED;color:#fff;font-size:100px;font-weight:800;letter-spacing:.01em;padding:4px 40px 10px;border-radius:30px;line-height:1.15;box-shadow:0 20px 40px -14px rgba(124,58,237,.6)}
.setup{font-style:italic;font-weight:600;font-size:60px;color:#7C3AED;margin-top:8px}
.pair{display:flex;align-items:center;gap:30px;margin-top:76px}
.tile.sm{width:150px;height:150px;border-radius:30px;gap:8px}
.tile.sm .tIcon{width:64px;height:64px}
.tile.sm .tName{font-size:28px}
.x{font-size:64px;font-weight:300;color:#8B8579}
.works{margin-top:30px;font-size:26px;letter-spacing:.22em}
.walkRow{position:absolute;left:0;right:0;top:1440px;height:120px;overflow:hidden}
.walkStrip{position:absolute;left:0;top:0;width:2160px;height:120px}
.walkStrip .w{position:relative;display:inline-block;margin-right:82px;transform:scale(.8)}
`;
