// CSS for the library scenes added after the launch reel. Same tokens as base-css.
export const SCENE_CSS = `
/* split screen with UGC */
.split .fit{position:absolute;inset:0;transform-origin:50% 0;transform:translateY(-198px) scale(.78)}
.ugc{top:960px!important;left:0;width:1080px;height:960px;object-fit:cover;object-position:50% 30%;z-index:12;box-shadow:0 -10px 30px rgba(60,35,10,.18)}

/* hook: feed of strategy videos */
.feed{position:absolute;left:0;right:0;top:330px;height:760px}
.fv{position:absolute;width:520px;background:#FFFDF9;border:2px solid #E7E0D4;border-radius:24px;padding:14px 14px 18px;box-shadow:0 28px 60px -30px rgba(100,65,30,.35)}
.fv0{left:40px;top:120px}.fv1{left:280px;top:20px;z-index:2}.fv2{left:520px;top:150px}
.fvThumb{position:relative;height:292px;border-radius:14px;overflow:hidden;background:#0b0b0d}
.fvThumb img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.fvShade{position:absolute;inset:0;background:linear-gradient(100deg,rgba(0,0,0,.75),rgba(0,0,0,.2) 60%)}
.fvT{position:absolute;left:20px;top:18px;font-size:44px;font-weight:800;color:#FACC15;line-height:1;text-shadow:0 4px 0 rgba(0,0,0,.5);max-width:300px}
.fvPlay{position:absolute;left:50%;top:50%;width:90px;height:64px;margin:-32px 0 0 -45px}
.fvMeta{padding:14px 6px 0}
.fvTitle{font-size:24px;font-weight:600;line-height:1.25;margin-bottom:4px}
.fvTag{position:absolute;right:-14px;top:-18px;background:#161514;color:#F6F2EA!important;font-size:20px;font-weight:700;padding:8px 14px;border-radius:10px;opacity:0;box-shadow:0 10px 20px -8px rgba(0,0,0,.4)}
.fv0 .fvTag{right:auto;left:-14px}
.mFeed{left:860px;top:600px}

/* hook: TradingView chart + alerts */
.tvWrap{position:absolute;left:0;right:0;top:300px;height:800px}
.tvChart{position:absolute;left:60px;right:60px;top:40px;height:520px;background:#131722;border-radius:24px;overflow:hidden;box-shadow:0 30px 60px -24px rgba(0,0,0,.5)}
.tvBar{display:flex;align-items:center;gap:16px;height:72px;padding:0 22px;border-bottom:1px solid #2a2e39;color:#d1d4dc;font-size:26px;font-weight:600}
.tvLg{width:44px;height:44px;border-radius:10px;background:#fff;padding:7px;flex:none}
.tvSym{color:#fff}
.tvPine{margin-left:auto;font-size:19px;color:#b2b5be!important;background:#1e222d;padding:6px 12px;border-radius:8px}
.tvSvg{position:absolute;left:20px;right:20px;bottom:20px;width:calc(100% - 40px);height:420px}
.tvAlerts{position:absolute;right:30px;top:470px;display:flex;flex-direction:column;gap:14px;align-items:flex-end}
.tvAl{display:flex;align-items:center;gap:14px;background:#FFFDF9;border:2px solid #E7E0D4;border-radius:18px;padding:14px 18px;font-size:26px;font-weight:600;box-shadow:0 16px 30px -16px rgba(60,35,10,.4);opacity:0}
.tvOrd{background:#DCFCE7;color:#16A34A!important;font-weight:700;font-size:20px;padding:6px 12px;border-radius:10px;opacity:0}
.bell{font-size:28px}
.mTV{left:60px;top:640px}

/* hook: prop challenge failed */
.propHookStage{top:260px;height:820px}
.phCard{width:900px;padding:40px 44px 46px}
.phTop{display:flex;justify-content:space-between;align-items:center;margin-bottom:30px}
.phRow{display:flex;justify-content:space-between;font-size:32px;font-weight:600;margin:18px 0 12px}
.phRow b{font-family:"JetBrains Mono",monospace;font-size:30px}
.phRow.danger b{color:#E11D48}
.phBar{height:22px;border-radius:11px;background:#F1EBE1;overflow:hidden}
.phFill,.phFill2{width:100%;height:100%;border-radius:11px;transform-origin:left center;background:#7C3AED}
.phBar.red .phFill2{background:#E11D48}
.stamp{position:absolute;left:50%;top:50%;margin:-70px 0 0 -230px;width:460px;text-align:center;font-family:"JetBrains Mono",monospace;font-weight:700;font-size:110px;letter-spacing:.06em;color:#E11D48;border:10px solid #E11D48;border-radius:20px;padding:0 10px;background:rgba(255,253,249,.88);opacity:0}

/* clarify */
.clCard .reply{margin-bottom:22px;align-items:center}
.clIntro{font-size:32px;font-weight:600;color:#2B2520}
.qList{display:flex;flex-direction:column;gap:16px}
.qRow{background:#F8F4ED;border:2px solid #EFE8DC;border-radius:22px;padding:18px 22px;opacity:0}
.qT{font-size:30px;font-weight:600;margin-bottom:12px}
.qOpts{display:flex;gap:12px}
.qo{position:relative;font-size:28px;font-weight:600;padding:10px 24px;border-radius:999px;background:#FFFDF9;border:2px solid #E7E0D4;color:#3d3832}
.qHand{position:absolute;left:30%;top:40%;font-size:84px;line-height:1;opacity:0;z-index:5;pointer-events:none}
.clDone{margin-top:22px;text-align:center;font-size:30px;font-weight:700;color:#16A34A;background:#F0FDF4;border:2px solid #BBF7D0;border-radius:18px;padding:14px;opacity:0}

/* TradingView webhook reply */
.whCard .uBubble{display:block;max-width:820px;font-size:36px;line-height:1.3;padding:16px 28px}
.whCard .cursor{height:36px;vertical-align:-6px}
.whUrl{display:flex;align-items:center;gap:12px;background:#FFFDF9;border:2px solid #DDD6FE;border-radius:16px;padding:12px 12px 12px 20px}
.whUrl .mono{flex:1;font-size:25px;color:#161514!important}
.whCopy{position:relative;width:110px;height:52px;border-radius:12px;background:#161514;color:#fff;font-size:24px;font-weight:600}
.wc1,.wc2{position:absolute;inset:0;display:flex;align-items:center;justify-content:center}
.wc2{opacity:0;font-size:30px}
.whSteps{display:flex;flex-direction:column;gap:10px}
.whs{display:flex;align-items:center;gap:14px;font-size:27px;font-weight:500;opacity:0}
.whs b{width:40px;height:40px;border-radius:50%;background:#EDE9FE;color:#7C3AED;display:flex;align-items:center;justify-content:center;font-size:22px;flex:none}
.hwh{right:60px;bottom:200px}

/* TradingView alert dialog (dark, like the real one) */
.tvDlg{position:relative;width:900px;background:#1e222d;border-radius:24px;padding:28px 34px 34px;color:#d1d4dc;box-shadow:0 34px 70px -28px rgba(0,0,0,.55)}
.tvdHead{display:flex;align-items:center;gap:16px;font-size:32px;font-weight:600;color:#fff;margin-bottom:24px}
.x2{margin-left:auto;color:#787b86;font-size:28px}
.tvdRow{display:flex;justify-content:space-between;align-items:center;padding:16px 0;border-top:1px solid #2a2e39;font-size:27px}
.tvdK{color:#787b86}
.tvdV{color:#d1d4dc;font-weight:500}
.cbx{display:inline-flex;width:30px;height:30px;border-radius:7px;background:#2962FF;color:#fff;align-items:center;justify-content:center;font-size:20px;margin-right:8px}
.tvdField{display:flex;align-items:center;gap:6px;height:66px;margin:4px 0 8px;border:2px solid #2962FF;border-radius:12px;padding:0 18px;background:#1e222d;font-size:26px}
.tvdPh{color:#5d606b}
.tvdUrl{color:#fff!important;font-size:26px}
.tvdMsg{font-size:20px;color:#b2b5be!important}
.pineOk{margin:18px 0 22px;display:inline-block;font-size:26px;font-weight:700;color:#16A34A;background:#DCFCE7;border-radius:12px;padding:10px 18px;opacity:0}
.tvdBtns{display:flex;justify-content:flex-end;gap:14px}
.tvdCancel{font-size:28px;padding:16px 30px;border-radius:12px;border:1px solid #434651;color:#d1d4dc}
.tvdCreate{position:relative;width:220px;height:66px;font-size:28px;font-weight:600;border-radius:12px;background:#2962FF;color:#fff}
.tc1,.tc2{position:absolute;inset:0;display:flex;align-items:center;justify-content:center}
.tc2{opacity:0}
.htv{right:80px;bottom:-70px}

/* alert -> agent -> broker flow */
.flowCard{width:900px;padding:44px 44px 48px}
.fNode{display:flex;align-items:center;gap:22px;background:#FBF8F3;border:2px solid #EFE8DC;border-radius:24px;padding:22px 24px;opacity:0}
.fIco{flex:none;width:84px;height:84px;border-radius:20px;padding:14px;border:2px solid #EFE8DC}
.tvI{background:#fff}.cbI{background:#161514;border-color:#161514}.mtI{background:#fff}
.fIco svg{width:100%;height:100%;display:block}
.fT{font-size:34px;font-weight:700;line-height:1.2}
.fTime{margin-left:auto;font-size:26px;font-weight:700;color:#7C3AED!important;opacity:0}
.fOk{color:#16A34A!important}
.fLine{position:relative;height:70px;margin-left:64px;width:4px;background:repeating-linear-gradient(180deg,#DDD6FE 0 10px,transparent 10px 18px)}
.fDot{position:absolute;left:-8px;top:0;width:20px;height:20px;border-radius:50%;background:#7C3AED;opacity:0;box-shadow:0 0 0 6px rgba(124,58,237,.18)}

/* guardrails */
.grCard{width:900px;padding:42px 44px 40px}
.grHead{display:flex;align-items:center;gap:16px;margin-bottom:24px}
.shield{font-size:48px}
.grRow{display:flex;align-items:center;gap:18px;padding:24px 4px;border-top:2px solid #F1EBE1;font-size:33px;font-weight:600;opacity:0}
.grV{margin-left:auto;font-size:26px;color:#7C3AED!important;font-weight:700}
.tog{position:relative;width:84px;height:46px;border-radius:23px;background:#D6D0C4;flex:none}
.tog i{position:absolute;left:4px;top:4px;width:38px;height:38px;border-radius:50%;background:#fff;box-shadow:0 2px 6px rgba(0,0,0,.2)}
.grFoot{margin-top:18px;text-align:center;opacity:0}

/* prop rules reply */
.prRow{display:flex;align-items:center;gap:16px;background:#FFFDF9;border:2px solid #EFE8DC;border-radius:18px;padding:14px 20px;font-size:30px;font-weight:600;opacity:0}
.lock{font-size:30px}
.prV{margin-left:auto;font-family:"JetBrains Mono",monospace;color:#7C3AED;font-size:30px}

/* prop gauges */
.gCard{width:900px;padding:42px 44px 42px}
.gHead{display:flex;align-items:center;justify-content:space-between;margin-bottom:22px}
.gRow{padding:20px 0;border-top:2px solid #F1EBE1;opacity:0}
.gTop{display:flex;justify-content:space-between;font-size:32px;font-weight:600;margin-bottom:14px}
.gTop b{font-size:28px;color:#3d3832}
.gBar{height:24px;border-radius:12px;background:#F1EBE1;overflow:hidden}
.gFill{width:100%;height:100%;border-radius:12px;transform-origin:left center}
.gFoot{margin-top:16px;text-align:center;opacity:0}

/* prop order blocked */
.blCard{width:900px;padding:42px 44px 44px}
.blOrder{background:#FBF8F3;border:2px solid #EFE8DC;border-radius:20px;padding:18px 24px;opacity:0}
.blO{font-size:36px;font-weight:700;margin-top:4px}
.blCheck{display:flex;align-items:center;gap:14px;font-size:28px;font-weight:600;color:#5c564d;margin:22px 4px;opacity:0}
.blStop{display:flex;align-items:center;gap:22px;background:#FFF1F2;border:3px solid #E11D48;border-radius:22px;padding:22px 24px;opacity:0}
.blIco{font-size:64px;line-height:1}
.blT{font-size:40px;font-weight:800;color:#BE123C}
.blS{font-size:27px;color:#9F1239;margin-top:4px}
.blSafe{margin-top:22px;text-align:center;font-size:30px;font-weight:700;color:#16A34A;background:#F0FDF4;border:2px solid #BBF7D0;border-radius:18px;padding:14px;opacity:0}

/* hookChat */
.hcStage{position:absolute;left:0;right:0;top:250px;display:flex;justify-content:center}
.hcCard{width:900px;padding:30px 36px 36px}
.hcL{font-size:32px;font-weight:600;color:#161514}
.hcL2{color:#7C3AED}
/* hookNotifs */
.hnWrap{position:absolute;left:0;right:0;top:200px;display:flex;flex-direction:column;align-items:center;gap:16px}
.hnTime{font-size:170px;font-weight:700;line-height:1;letter-spacing:-6px;color:#161514}
.hnDate{font-size:26px;letter-spacing:4px;color:#7C3AED;margin-bottom:18px}
.hnN{width:960px;display:flex;gap:22px;align-items:center;padding:22px 28px;border-radius:36px;background:rgba(28,28,30,.94);box-shadow:0 24px 50px -20px rgba(0,0,0,.45)}
.hnIco{flex:none;width:76px;height:76px;border-radius:18px;background:#161514;padding:12px;border:2px solid #333}
.hnIco svg{width:100%;height:100%;display:block}
.hnTx{flex:1;color:#fff}
.hnTop{display:flex;justify-content:space-between;font-size:24px;font-weight:600;color:#a1a1a6}
.hnMain{font-size:32px;font-weight:600;margin-top:2px}
.mHN{left:880px;top:720px}

/* hookCode */
.hcodeWrap{position:absolute;left:0;right:0;top:230px;display:flex;justify-content:center}
.hcode{position:relative;width:940px;background:#1B1C1F;border-radius:26px;box-shadow:0 30px 60px -20px rgba(0,0,0,.45);overflow:visible}
.hcBar{display:flex;align-items:center;gap:10px;padding:18px 24px;border-bottom:2px solid #2a2b30}
.hcBar i{width:16px;height:16px;border-radius:50%;background:#3a3b41}
.hcBar span{margin-left:14px;font-size:24px;color:#9a9aa3}
.hcBody{padding:22px 26px 28px;font-size:27px;line-height:1.55;color:#E6E6EA;white-space:pre}
.hcNo{display:inline-block;width:46px;color:#55565e}
.hcode .kw{color:#C4B5FD}.hcode .fn{color:#7DD3FC}.hcode .nb{color:#FDBA74}.hcode .st{color:#86EFAC}.hcode .cm{color:#6b6b74}
.hcStamp{position:absolute;left:50%;top:50%;margin:-60px 0 0 -330px;width:660px;text-align:center;background:#7C3AED;color:#fff;font-family:"JetBrains Mono",monospace;font-weight:700;font-size:56px;letter-spacing:.06em;padding:22px 0;border-radius:18px;box-shadow:0 20px 40px -10px rgba(124,58,237,.6);opacity:0}
/* describe */
.dsCard .rules{margin:6px 0 14px}
.dsCard .rule{opacity:0}
/* hookVs */
.vsWrap{position:absolute;left:0;right:0;top:250px;display:flex;justify-content:center}
.vsCard{width:960px;padding:28px 28px 20px}
.vsHead{display:flex;align-items:center;gap:16px;margin-bottom:12px}
.vsH{flex:1;text-align:center;font-size:30px;font-weight:700;letter-spacing:.14em;padding:14px 0;border-radius:16px}
.vsL{background:#F1EBE1;color:#5c564d}.vsR{background:#7C3AED;color:#fff}
.vsMid{flex:none;font-family:Poppins,sans-serif;font-weight:800;font-size:34px;color:#161514}
.vsRow{display:flex;gap:16px;padding:10px 0;border-top:2px solid #F1EBE1}
.vsC{flex:1;font-size:29px;font-weight:600;padding:12px 16px;border-radius:14px;opacity:0}
.vsBad{color:#9F1239;background:#FFF1F2}.vsGood{color:#14532D;background:#F0FDF4}

/* TikTok/Reels safe area: tall phones crop ~90px per side, keep every element inside */
.safe{position:absolute;inset:0;transform:scale(.84);transform-origin:50% 46%}
.dsCard .uBubble{display:block;max-width:820px;font-size:34px;line-height:1.3;padding:16px 28px}

/* broker chat: more brokers chip */
.brMore{margin-top:14px;text-align:center;font-size:22px;color:#7C3AED;letter-spacing:.06em}
/* brokerGrid */
.bgHookWrap{position:absolute;left:0;right:0;top:230px;display:flex;justify-content:center}
.bgCard{width:920px;padding:30px 30px 24px}
.bgHead{display:flex;align-items:center;justify-content:space-between;margin-bottom:20px}
.bgGrid{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.bgCell{position:relative;display:flex;align-items:center;gap:16px;background:#FBF8F3;border:2px solid #EFE8DC;border-radius:18px;padding:12px 14px;opacity:0}
.bgLogo{flex:none;width:58px;height:58px;border-radius:14px;background:#fff;border:2px solid #EFE8DC;display:flex;align-items:center;justify-content:center;overflow:hidden}
.bgLogo .lg{width:40px;height:40px;object-fit:contain}
.bgName{font-size:27px;font-weight:600}
.bgChk{margin-left:auto;flex:none;width:38px;height:38px;border-radius:50%;background:#16A34A;color:#fff;font-size:22px;font-weight:700;display:flex;align-items:center;justify-content:center}
.bgFoot{margin-top:18px;text-align:center;color:#5c564d;letter-spacing:.1em}
/* hookLoss */
.lsWrap{position:absolute;left:0;right:0;top:240px;display:flex;justify-content:center}
.lsCard{width:920px;padding:30px 34px 26px}
.lsTop{margin-bottom:18px}
.lsBig{font-family:Poppins,sans-serif;font-weight:800;font-size:110px;line-height:1;color:#DC2626;letter-spacing:-3px}
.lsRow{display:flex;align-items:center;gap:18px;padding:16px 0;border-top:2px solid #F1EBE1;opacity:0}
.lsPair{width:150px;font-size:24px;color:#5c564d}
.lsV{width:170px;font-size:32px;font-weight:700;color:#DC2626}
.lsWhy{margin-left:auto;font-size:26px;font-weight:700;color:#9F1239;background:#FFF1F2;border:2px solid #FECDD3;border-radius:12px;padding:8px 14px;opacity:0}
/* hookSafe */
.sfWrap{position:absolute;left:0;right:0;top:260px;display:flex;justify-content:center}
.sfCard{width:920px;padding:30px 34px 24px}
.sfHead{display:flex;align-items:center;gap:20px;margin-bottom:18px}
.sfRow{display:flex;align-items:center;justify-content:space-between;padding:18px 0;border-top:2px solid #F1EBE1;font-size:30px;font-weight:500;opacity:0}
.sfV{font-weight:700;font-size:28px;padding:6px 14px;border-radius:12px}
.sfV.ok{color:#14532D;background:#F0FDF4}.sfV.no{color:#9F1239;background:#FFF1F2}
.sfFoot{margin-top:14px;text-align:center;color:#5c564d;letter-spacing:.08em}
/* library */
.lbCard{width:920px;padding:30px 30px 24px}
.lbHead{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px}
.lbRow{display:flex;align-items:center;justify-content:space-between;gap:16px;background:#FBF8F3;border:2px solid #EFE8DC;border-radius:18px;padding:16px 18px;margin-bottom:12px;opacity:0}
.lbName{font-size:30px;font-weight:700}
.lbBtn{position:relative;flex:none;background:#161514;color:#fff;font-size:26px;font-weight:600;padding:12px 26px;border-radius:14px;min-width:120px;text-align:center}
.lbBtn .lb2{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;opacity:0}
.lbFoot{text-align:center;color:#5c564d;letter-spacing:.04em;margin-top:6px;white-space:normal;font-size:18px}
.lbCard .hand{right:10px;top:150px;bottom:auto;font-size:100px}
.anCard .hand{right:10px;bottom:-60px;font-size:100px}
/* analytics */
.anCard{width:920px;padding:30px 32px 26px}
.anRow{display:flex;align-items:center;gap:18px;padding:16px 0;border-top:2px solid #F1EBE1;font-size:30px;font-weight:600}
.anRow .mono{margin-left:auto;color:#5c564d}
.anRow b{width:120px;text-align:right;font-size:32px}
.anRow b.pos{color:#16A34A}.anRow b.neg{color:#DC2626}
.anRec{display:flex;align-items:center;justify-content:space-between;gap:16px;margin-top:16px;background:#F5F1FF;border:2px solid #C4B5FD;border-radius:18px;padding:16px 18px;opacity:0}
.anRT{font-size:29px;font-weight:700;color:#4C1D95}
.anBtn{position:relative;flex:none;background:#7C3AED;color:#fff;font-size:26px;font-weight:600;padding:12px 24px;border-radius:14px;min-width:130px;text-align:center}
.anBtn .ab2{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;opacity:0}
`;
