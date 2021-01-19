// JavaScript Document 
window.total = 0;
window.correct = 0;
window.wrong = 0;
window.flag = 0;
window.star=0;
window.settypetime = 0;
window.remainingtypetime = 0;
window.usedtypetime = 0;
window.realtimenetwpm = 0;  
var nextCharCode='';
var shiftkey=newshiftkey='';
var fired = false;
var base_url = window.location.origin;
var lefthand=["Q","W","E","R","T","A","S","D","F","B","G","Z","X","C","V","!","@","#","$","%","1","2","3","4","5","a","b","c","d","e","f","g","q","r","s","t","v","w","x","z","capslock","keycolon","esc","tab","shift"];
var righthand=["Y","U","I","O","P","H","J","K","L","N","M","6","7","8","9","0","h","i","j","k","l","m","n","o","p","u","y","space","&","*",")","^","(","-","_","'",";",":",".",",","?","/","|","[","]","{","}","<",">","=","+","\\"];

var leftshiftkey=["U","I","O","P","H","J","K","L","N","M","Y",":","<",">","|","?","{","}","&","*",")","(","_","+","^"];
var rightshiftkey=["Q","W","E","R","T","A","B","S","D","F","G","Z","X","C","V","!","@","#","$","%","~"];

var shiftrequired=["^","$","~","!","@","#","%","&","*","(",")","_","+","|","{","}",":","<",">","?","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
jQuery(document).ready(function(){ 
   

    /*code for toogle on off*/
    
    /*end*/  
    var typingBody=$(".lesson-content-box").html();
   
    jQuery(".lesson-line").removeClass('activeLessonLine');
  
    jQuery(".lesson-content-box").find('div:nth-child(1)').addClass('activeLessonLine').find('span:nth-child(1)').addClass('box-lesson-goingnew');
    

    
    var nextWord=jQuery(".lesson-content-box").find('div:nth-child(1)').find('span:nth-child(1)').text();
    var regex1 = new RegExp("^[a-zA-Z\!\@\#\$\%\^\&\*\(\)\_\+\|\}\{\:\"\?\>\<]+$");
    if (regex1.test(nextWord)){
        if(nextWord==nextWord.toUpperCase()){
            newshiftkey=16;
        }  
    }

    var charCode=nextWord.charCodeAt(0);
    jQuery('.keyboard-bg').find('.newkey-'+charCode).parent().addClass('keyHighlight');
    jQuery('.newkeyboardset').find('.keydisplayfinger').removeClass('keydisplayfinger');
    jQuery('.newkeyboardset').find('.newhandkey-'+charCode).addClass('keydisplayfinger');
    if(charCode=="34")
    {
        jQuery('.keyboard-bg').find('#shift_leftnew').addClass('keyHighlight');
        $(".keyboard-bg").find("#shift_leftnew").children().addClass("shiftlefttext");
        jQuery('.newkeyboardset').find('.newhandkey-left').addClass('keydisplayfinger');
    }
    var matchleftkey=lefthand.indexOf(nextWord);
    var matchrightkey=righthand.indexOf(nextWord);
    if(matchleftkey!=-1){
        $("#f_defaultnew").hide();
        $("#j_defaultnew").show();  
    }
    if(matchrightkey!=-1){
    $("#j_defaultnew").hide();
    $("#f_defaultnew").show();

    }
    var matchleftkey=lefthand.indexOf(nextWord);
    var matchrightkey=righthand.indexOf(nextWord);
    
    var shiftkey=shiftrequired.indexOf(nextWord);
    var leftshiftkeynew=leftshiftkey.indexOf(nextWord);
    var rightshiftkeynew=rightshiftkey.indexOf(nextWord);
    if(newshiftkey!=''){
           if(rightshiftkeynew!=-1){
            $('#j_defaultnew').hide();
            $(".keyboard-bg").find("#shift_leftnew").children().removeClass("shiftlefttext");
            $(".keyboard-bg").find("#shift_rightnew").addClass("keyHighlight");
            $(".keyboard-bg").find("#shift_rightnew").children().addClass("shiftrighttextcolor");
            // $(".newhandkey-right").show();
            jQuery('.newkeyboardset').find('.newhandkey-right').addClass('keydisplayfinger');
        
        }
        if(matchrightkey!=-1)
        {
            if(leftshiftkeynew!=-1){
            $('#f_defaultnew').hide();
            $(".keyboard-bg").find("#shift_rightnew").children().removeClass("shiftrighttextcolor");
            $(".keyboard-bg").find("#shift_leftnew").addClass("keyHighlight");
            $(".keyboard-bg").find("#shift_leftnew").children().addClass("shiftlefttext");
            // $(".newhandkey-left").show();
            jQuery('.newkeyboardset').find('.newhandkey-left').addClass('keydisplayfinger');
        }
        }

    }
    var findFinger=$('.newkey-'+charCode).attr('data-finger');
    var findHand=$('.newkey-'+charCode).attr('data-hand');
    $('.lHfingerCircle').css('display','none');
    if(newshiftkey!=''){
        if(findHand=='left'){var shiftHandKey='rightnew';}else{var shiftHandKey='left';
    }
    if(jQuery('.keyboard-bg').find('.newkey-'+newshiftkey).hasClass(shiftHandKey))
        {
            jQuery('#'+shiftHandKey+'Shift').addClass('keyHighlight');
            var findShiftFinger=jQuery('#'+shiftHandKey+'Shift').attr('data-finger');
            $('.'+findShiftFinger).css('display','block');	
        }				
        
    }
    $('.'+findFinger).css('display','block');
    /*code for wpm and accuracy*/
    jQuery(document).one("keypress", function (e) {
        
        realtimeScore();
       
        
    });
    /*end*/
























    jQuery(document).on(" keypress",function(e){
      
        // if ( ( e.keycode || e.which ) == 32) {
        //     e.preventDefault();
        // }
        
        // if(!fired) {
        //     fired = true;
           

        $(".keyboard-bg").find("#shift_leftnew").removeClass("keyHighlightnewshift");
        /*code for shifty right new*/
        $(".keyboard-bg").find("#shift_rightnew").children().removeClass("shiftrighttextcolor");
        $(".keyboard-bg").find("#shift_leftnew").children().removeClass("shiftlefttext");
        /*end*/
        $(".keyboard-bg").find("#shift_rightnew").removeClass("keyHighlightnewshift");
        $(".keyboard-bg").find(".keyHighlightnew").removeClass("keyHighlightnew");
        $(".lesson-content-box").find(".box-wronglesson").addClass("box-lesson-wrongnew");
        $(".lesson-content-box").find(".box-wronglesson").removeClass("box-wronglesson");
        var going=jQuery(".lesson-line").find('.box-lesson-goingnew').next().text();
        var goingne=jQuery(".lesson-line").find('.box-lesson-goingnewnew').next().text();
        var newval=jQuery(".lesson-line").find('.box-wronglesson').next().text();
        if((going.charCodeAt(0)===94) || (goingne.charCodeAt(0)===94)|| (newval.charCodeAt(0)===94) || (going.charCodeAt(0)===72) || (goingne.charCodeAt(0)===72)|| (newval.charCodeAt(0)===72)
        || (going.charCodeAt(0)===78) || (goingne.charCodeAt(0)===78)|| (newval.charCodeAt(0)===78)|| (going.charCodeAt(0)===89) || (goingne.charCodeAt(0)===89)|| (newval.charCodeAt(0)===89)
        || (going.charCodeAt(0)===160) || (goingne.charCodeAt(0)===160)|| (newval.charCodeAt(0)===160) || (going.charCodeAt(0)===65) || (goingne.charCodeAt(0)===65)|| (newval.charCodeAt(0)===65))
        {
            $('#shift_right').hide();
            $('#shift_left').hide();
            $('#j_defaultnew').hide();
            $('#f_defaultnew').hide();
            

            
        }
        // var goingi=jQuery(".lesson-line").find('.goingnew').text();
        // var goingnei=jQuery(".lesson-line").find('.goingnewnew').text();
        // var newvalnew=jQuery(".lesson-line").find('.iswrong').text();
        // if((goingi.charCodeAt(0)===160) || (goingnei.charCodeAt(0)===160)|| (newvalnew.charCodeAt(0)===160))
        // {
        //     $('#shift_left').hide();

        // }
        
        var chr = String.fromCharCode( e.keyCode );
        var x = e.which || e.keyCode;	
        var newkeypress=e.key;
        /*code for capslock check*/
        
        /*end*/
        keyPress  = e.key;
        if (e.which === 32){
            e.preventDefault();
        }
       
        var wrongkey=$(".box-lesson-wrong").length;  
        if(e.which === 8){
            e.preventDefault();  
        }
        else{
            var time=$('#timer').html();
            if(time!='00:00'){
                if (e.which === 32){
                    e.preventDefault();
                }
                        
                if(jQuery('.activeLessonLine span:last').hasClass('box-lesson-goingnew') || jQuery('.activeLessonLine span:last').hasClass('box-lesson-goingnewnew') ){
                //   else{
                    //     jQuery(".lesson-line").find('.box-lesson-goingnew').removeClass('box-lesson-goingnew').addClass('box-wronglesson');
                    //     jQuery(".lesson-line").find('.box-lesson-goingnewnew').removeClass('box-lesson-goingnewnew').addClass('box-wronglesson');

                    //     jQuery(".lesson-line").find('.box-wronglesson').parent().addClass('gone').removeClass('activeLessonLine').next().addClass('activeLessonLine').addClass('startLine').find('span:nth-child(1)').addClass('box-lesson-goingnew').parent().next().addClass('paddingTop');

                    //     window.wrong++;
                    // }
                    var forspace=jQuery(".lesson-line").find('.box-lesson-goingnew').text();
                    var spa=forspace.replace('\xa0', ' ');
                   
                   if((keyPress  == jQuery(".lesson-line").find('.box-lesson-goingnew').text()) || (keyPress==spa)){
                      
                        jQuery(".lesson-line").find('.box-lesson-goingnew').addClass('box-lesson-rightnew');
                        jQuery(".lesson-line").find('.box-lesson-goingnewnew').addClass('box-lesson-rightnew');

                        jQuery(".lesson-line").find('.box-lesson-goingnew').addClass('box-lesson-rightnew');
                        jQuery(".lesson-line").find('.box-lesson-goingnew').removeClass('box-lesson-goingnew').parent().addClass('gone').removeClass('activeLessonLine').next().addClass('activeLessonLine').addClass('startLine').find('span:nth-child(1)').addClass('box-lesson-goingnew').parent().next().addClass('paddingTop');
                        
                        jQuery(".lesson-line").find('.box-lesson-goingnewnew').removeClass('box-lesson-goingnewnew').parent().addClass('gone').removeClass('activeLessonLine').next().addClass('activeLessonLine').addClass('startLine').find('span:nth-child(1)').addClass('box-lesson-goingnew').parent().next().addClass('paddingTop');
                        window.correct++;	
                   }
                   else{
                    
                        var wronglength=jQuery(".box-lesson-wrong").length;
                        // if(wronglength==1){
                           
                        //     jQuery(".lesson-line").find('.wrong').removeClass('wrong').addClass('goingnewnew');
                        //     jQuery('.newkeyboardset').find('.keydisplayfinger').removeClass('keydisplayfinger');
                        //     jQuery('.newkeyboardset').find('.newhandkey-'+charCode).addClass('keydisplayfinger');

                        // }else{
                            // alert("charactercodessd"+charCode);
                           
                    //         jQuery('.newkeyboardset').find('.keydisplayfinger').removeClass('keydisplayfinger');
                    //         jQuery('.newkeyboardset').find('.newhandkey-'+charCode).addClass('keydisplayfinger');
                            
                    //         jQuery(".lesson-line").find('.box-lesson-goingnew').removeClass('box-lesson-goingnew').addClass('box-wronglesson');
                    //        jQuery(".lesson-line").find('.box-wronglesson').next().addClass('box-lesson-goingnewnew');
                    //        if(jQuery(".lesson-line").find('.box-wronglesson').next().hasClass('box-lesson-goingnewnew')){
                    //         // alert('wrong');

                    //        window.wrong++;
                    //  }
                    if((keyPress  != jQuery(".lesson-line").find('.box-lesson-goingnew').text()) || (keyPress!=spa))
                    {

                   jQuery(".lesson-line").find('.box-lesson-goingnew').removeClass('box-lesson-goingnew').addClass('box-wronglesson');
                     jQuery(".lesson-line").find('.box-wronglesson').parent().addClass('gone').removeClass('activeLessonLine').next().addClass('activeLessonLine').addClass('startLine').find('span:nth-child(1)').addClass('box-lesson-goingnew').parent().next().addClass('paddingTop');

                       window.wrong++;
                    }
                        // if((keyPress  != jQuery(".lesson-line").find('.box-lesson-goingnew').text()) || (keyPress!=spa))
                        // {

                        
                        // jQuery(".lesson-line").find('.box-lesson-goingnew').removeClass('box-lesson-goingnew').addClass('box-wronglesson');
                        // jQuery(".lesson-line").find('.box-lesson-goingnewnew').removeClass('box-lesson-goingnewnew').addClass('box-wronglesson');

                        // jQuery(".lesson-line").find('.box-wronglesson').parent().addClass('gone').removeClass('activeLessonLine').next().addClass('activeLessonLine').addClass('startLine').find('span:nth-child(1)').addClass('box-lesson-goingnew').parent().next().addClass('paddingTop');

                        // window.wrong++;
                        // }

                           
                            var val= jQuery(".lesson-line").find('.box-wronglesson').next().text();
                            var go=jQuery(".lesson-line").find('.box-wronglesson').text();
                            var asci=go.charCodeAt(0);
                            var nextval= val.charCodeAt(0);
                            if (e.which === 32){
                                e.preventDefault();
                            }
                            // if(val===keyPress)
                            // {
                            //     alert('kkkk');
                            //     jQuery(".lesson-line").find('.iswrong').next().addClass('goingnewnew');
                                

                            // }
                            if(nextval==160){
                              
                        //    alert('space');
                        // jQuery('.newkeyboardset').find('.newhandkey-left').find('.keydisplayfinger').removeClass('keydisplayfinger');
                            $("#shift_left").hide();
                            jQuery(".lesson-line").find('.box-wronglesson').next().addClass('box-lesson-goingnewnew');
                            
                            jQuery('.newkeyboardset').find('.keydisplayfinger').removeClass('keydisplayfinger');
                            jQuery('.keyboard-bg').find('.keyHighlight').removeClass('keyHighlight');
                            jQuery(".keyboard-bg").find(".newkey-32").parent().addClass("keyHighlightnew");
                            jQuery("#f_defaultnew").hide();
                            jQuery("#j_defaultnew").hide();

                            jQuery('.newkeyboardset').find('.newhandkey-32').addClass('keydisplayfinger');

                            return false;

                            
                            }
                            else{
                                // alert('add goingnewnew');
                                jQuery(".lesson-line").find('.box-wronglesson').next().addClass('box-lesson-goingnewnew');
                               
                            }
                        
                        var goingnewnew_val=jQuery(".box-lesson-goingnewnew").text();
                        //alert(goingnewnew_val);
                        if(goingnewnew_val!=""){
                            var goingnewnew=jQuery(".box-lesson-goingnewnew").text();
                        }else{
                            var goingnewnew=jQuery(".box-lesson-goingnew").text();
                        }
                        var goingnewn=jQuery(".box-lesson-goingnew").next().text();
                        var vale=goingnewn.charCodeAt(0);
                        // alert("goingnewnew"+goingnewnew);
                        
                        var goingnewnew=goingnewnew.replace('\xa0', ' ');
                        var originaltext=goingnewnew.charCodeAt(0);
                        //alert("originalteshf"+originaltext);
                        var currentiswrong=$(".box-wronglesson").length;
                        var nextwrongkey=$(".box-lesson-wrongnew").length;
                        var asciivalueat=newkeypress.charCodeAt(0);

                        // alert("newkeypress"+asciivalueat);
                        // alert("orginaltext"+originaltext);

                        // if (e.which === 32){
                        //                 e.preventDefault();
                        //             }
                        // if(asciivalueat===vale)
                        //        {
                        //            alert('jjj');
                        //         //    jQuery(".lesson-line").find('.goingnewnew').removeClass('goingnewnew').addClass('goingnewnew');
       
                        //        }
                        if((currentiswrong<1)&&(nextwrongkey>=1)){
                            // alert("wrongkey");
                            
                            if(asciivalueat==originaltext ){
                 
                                    jQuery(".lesson-line").find('.box-lesson-goingnew').addClass('box-lesson-rightnew');
                                    jQuery(".lesson-line").find('.box-lesson-goingnewnew').addClass('box-lesson-rightnew');
            
                                    jQuery(".lesson-line").find('.box-lesson-goingnew').addClass('box-lesson-rightnew');
                                    jQuery(".lesson-line").find('.box-lesson-goingnew').removeClass('box-lesson-goingnew').parent().addClass('gone').removeClass('activeLessonLine').next().addClass('activeLessonLine').addClass('startLine').find('span:nth-child(1)').addClass('box-lesson-goingnew').parent().next().addClass('paddingTop');
                                    
                                    jQuery(".lesson-line").find('.box-lesson-goingnewnew').removeClass('box-lesson-goingnewnew').parent().addClass('gone').removeClass('activeLessonLine').next().addClass('activeLessonLine').addClass('startLine').find('span:nth-child(1)').addClass('box-lesson-goingnew').parent().next().addClass('paddingTop');
                                    window.correct++;	
                                //}
                            
                            // alert('matched');
                            //$(".lesson-line").find("iswrong").next().addClass(goingnew);
                        }
                        else{
                        //  alert("test11");
                            // jQuery(".lesson-line").find('.goingnewnew').removeClass('goingnewnew').addClass('iswrong');
                            }
                        }else{
                            // alert("rihght")
                            
                            $(".lesson-line").find("box-wronglesson").removeClass('box-wronglesson').addClass('box-lesson-wrong');
                        }
                        
                        // alert("count");
                        //  window.wrong++;

                    }
                //    else
                //    {
                //         jQuery(".lesson-line").find('.box-lesson-goingnew').removeClass('box-lesson-goingnew').addClass('box-wronglesson');
                //         jQuery(".lesson-line").find('.box-lesson-goingnewnew').removeClass('box-lesson-goingnewnew').addClass('box-wronglesson');

                //         jQuery(".lesson-line").find('.box-wronglesson').parent().addClass('gone').removeClass('activeLessonLine').next().addClass('activeLessonLine').addClass('startLine').find('span:nth-child(1)').addClass('box-lesson-goingnew').parent().next().addClass('paddingTop');

                //         window.wrong++;
                //    }
                   
                    jQuery('.lesson-content-box').find('.gone').slideUp();
                    // jQuery('.lesson-content').find('.gone').addClass('hideLine');	
                    if ($(".gone,.hideLine").length > 0) {
                        $(".gone,.hideLine").each(function() {
                            if($(this).hasClass('startLine')){
                                $(this).removeClass('startLine');
                            }
                            if($(this).hasClass('paddingTop')){
                                $(this).removeClass('paddingTop');
                            }
                        }); 
                    }
                    if ($(".activeLessonLine,.startLine").length > 0) {
                        $(".activeLessonLine,.startLine").each(function() {
                            if($(this).hasClass('paddingTop')){
                                $(this).removeClass('paddingTop');
                            }
                            if($(this).hasClass('hideLine')){
                                $(this).removeClass('hideLine');
                            }
                        }); 
                    }
                }else{
                     var forspace=jQuery(".lesson-line").find('.box-lesson-goingnew').text();
                     var spa=forspace.replace('\xa0', ' ');
                    if((keyPress  == jQuery(".lesson-line").find('.box-lesson-goingnew').text()) || (keyPress==spa)){
                       
                        jQuery(".lesson-line").find('.box-lesson-goingnew').removeClass('box-lesson-goingnew').addClass('box-lesson-rightnew').next().addClass('box-lesson-goingnew');
                        
                        window.correct++;	
                    }
                    else{
                     
                       
                       
                        var wronglength=jQuery(".box-lesson-wrong").length;
                        // if(wronglength==1){
                           
                        //     jQuery(".lesson-line").find('.wrong').removeClass('wrong').addClass('goingnewnew');
                        //     jQuery('.newkeyboardset').find('.keydisplayfinger').removeClass('keydisplayfinger');
                        //     jQuery('.newkeyboardset').find('.newhandkey-'+charCode).addClass('keydisplayfinger');

                        // }else{
                            // alert("charactercodessd"+charCode);
                           
                            jQuery('.newkeyboardset').find('.keydisplayfinger').removeClass('keydisplayfinger');
                            jQuery('.newkeyboardset').find('.newhandkey-'+charCode).addClass('keydisplayfinger');
                            
                            jQuery(".lesson-line").find('.box-lesson-goingnew').removeClass('box-lesson-goingnew').addClass('box-wronglesson');
                           jQuery(".lesson-line").find('.box-wronglesson').next().addClass('box-lesson-goingnewnew');
                           if(jQuery(".lesson-line").find('.box-wronglesson').next().hasClass('box-lesson-goingnewnew')){
                            // alert('wrong');

                           window.wrong++;
                           }

                           
                            var val= jQuery(".lesson-line").find('.box-wronglesson').next().text();
                            var go=jQuery(".lesson-line").find('.box-wronglesson').text();
                            var asci=go.charCodeAt(0);
                            var nextval= val.charCodeAt(0);
                            if (e.which === 32){
                                e.preventDefault();
                            }
                            // if(val===keyPress)
                            // {
                            //     alert('kkkk');
                            //     jQuery(".lesson-line").find('.iswrong').next().addClass('goingnewnew');
                                

                            // }
                            if(nextval==160){
                              
                        //    alert('space');
                        // jQuery('.newkeyboardset').find('.newhandkey-left').find('.keydisplayfinger').removeClass('keydisplayfinger');
                            $("#shift_left").hide();
                            jQuery(".lesson-line").find('.box-wronglesson').next().addClass('box-lesson-goingnewnew');
                            
                            jQuery('.newkeyboardset').find('.keydisplayfinger').removeClass('keydisplayfinger');
                            jQuery('.keyboard-bg').find('.keyHighlight').removeClass('keyHighlight');
                            jQuery(".keyboard-bg").find(".newkey-32").parent().addClass("keyHighlightnew");
                            jQuery("#f_defaultnew").hide();
                            jQuery("#j_defaultnew").hide();

                            jQuery('.newkeyboardset').find('.newhandkey-32').addClass('keydisplayfinger');

                            return false;

                            
                            }
                            else{
                                // alert('add goingnewnew');
                                jQuery(".lesson-line").find('.box-wronglesson').next().addClass('box-lesson-goingnewnew');
                               
                            }
                            // if(val==keyPress){
                              
                            //     //    alert('space');
                            //     // jQuery('.newkeyboardset').find('.newhandkey-left').find('.keydisplayfinger').removeClass('keydisplayfinger');
                            //         // $("#shift_left").hide();
                            //         // jQuery(".lesson-line").find('.iswrong').next().addClass('goingnewnew');
                                    
                            //         // jQuery('.newkeyboardset').find('.keydisplayfinger').removeClass('keydisplayfinger');
                            //         // jQuery('.keyboard-bg').find('.keyHighlight').removeClass('keyHighlight');
                            //         // jQuery(".keyboard-bg").find(".newkey-32").parent().addClass("keyHighlightnew");
                            //         // jQuery("#f_defaultnew").hide();
                            //         // jQuery("#j_defaultnew").hide();
        
                            //         // jQuery('.newkeyboardset').find('.newhandkey-32').addClass('keydisplayfinger');
        
                            //         return false;
        
                                    
                            //         }
                            //         else{
                            //             alert('add goingnewnew');
                            //             jQuery(".lesson-line").find('.iswrong').next().addClass('goingnewnew');
                                       
                            //         }
                            // alert(val.charCodeAt(0));
                            


                        //  }
                        var goingnewnew_val=jQuery(".box-lesson-goingnewnew").text();
                        //alert(goingnewnew_val);
                        if(goingnewnew_val!=""){
                            var goingnewnew=jQuery(".box-lesson-goingnewnew").text();
                        }else{
                            var goingnewnew=jQuery(".box-lesson-goingnew").text();
                        }
                        var goingnewn=jQuery(".box-lesson-goingnew").next().text();
                        var vale=goingnewn.charCodeAt(0);
                        // alert("goingnewnew"+goingnewnew);
                        
                        var goingnewnew=goingnewnew.replace('\xa0', ' ');
                        var originaltext=goingnewnew.charCodeAt(0);
                        //alert("originalteshf"+originaltext);
                        var currentiswrong=$(".box-wronglesson").length;
                        var nextwrongkey=$(".box-lesson-wrongnew").length;
                        var asciivalueat=newkeypress.charCodeAt(0);

                        // alert("newkeypress"+asciivalueat);
                        // alert("orginaltext"+originaltext);

                        // if (e.which === 32){
                        //                 e.preventDefault();
                        //             }
                        // if(asciivalueat===vale)
                        //        {
                        //            alert('jjj');
                        //         //    jQuery(".lesson-line").find('.goingnewnew').removeClass('goingnewnew').addClass('goingnewnew');
       
                        //        }
                        if((currentiswrong<1)&&(nextwrongkey>=1)){
                            // alert("wrongkey");
                            
                            if(asciivalueat==originaltext ){
                        //    alert('match');
                            //    if(goingnewnew.charCodeAt(0)===asciivalueat){
                            //     jQuery(".lesson-line").find('.goingnewnew').removeClass('goingnewnew').addClass('rightnew').next().addClass('goingnew');

                            //              window.correct++;
                            //    }
                            //    else 
                            //    {
                            //     jQuery(".lesson-line").find('.goingnewnew').removeClass('goingnewnew').addClass('goingnewnew');

                            //    }
                                
                                // if (e.which === 32){
                                //     //e.preventDefault();
                                  
                                //     if(goingnewnew.charCodeAt(0)==160){
                                // // jQuery('.newkeyboardset').find('.newhandkey-32').addClass('keydisplayfinger');	
                                      
                                //         jQuery(".lesson-line").find('.goingnewnew').removeClass('goingnewnew').addClass('rightnew').next().addClass('goingnew');

                                //         window.correct++;
                                //     }else{
                                       
                                //         jQuery(".lesson-line").find('.goingnewnew').removeClass('goingnewnew').addClass('goingnewnew');
                                //     }
                                   
                                // }  else{
                                    jQuery(".lesson-line").find('.box-lesson-goingnewnew').removeClass('box-lesson-goingnewnew').addClass('box-lesson-rightnew').next().addClass('box-lesson-goingnew');
                                    window.correct++;
                                //}
                            
                            // alert('matched');
                            //$(".lesson-line").find("iswrong").next().addClass(goingnew);
                        }else{
                        //  alert("test11");
                            // jQuery(".lesson-line").find('.goingnewnew').removeClass('goingnewnew').addClass('iswrong');
                        }
                        }else{
                            // alert("rihght")
                            
                            $(".lesson-line").find("box-wronglesson").removeClass('box-wronglesson').addClass('box-lesson-wrong');
                        }
                        
                        // alert("count");
                        //  window.wrong++;

                        }
                    var currentText=jQuery('.activeLessonLine').find('.box-lesson-goingnew').text();
                    
                    // if(jQuery('.activeLessonLine span:last').hasClass('box-lesson-goingnew')){
                    //     nextCharCode=13;
                    // }
                }
            }
        }
        var nextChar_new=jQuery('.activeLessonLine').find('.box-lesson-goingnew').text();

        // alert(nextChar_new);
        if(nextChar_new==""){
        // var nextChar=jQuery(".lesson-content").find('div:nth-child(1)').find('span:nth-child(1)').text();

            var nextChar=jQuery('.activeLessonLine').find('.box-lesson-goingnewnew').text();
        }else{
        // var nextChar=jQuery(".lesson-content").find('div:nth-child(1)').find('span:nth-child(1)').text();

            var nextChar=jQuery('.activeLessonLine').find('.box-lesson-goingnew').text();
        }
        var nextnewcharater=nextChar.charCodeAt(0);
        var regex = new RegExp("^[a-zA-Z\!\@\#\$\%\^\&\*\(\)\_\+\|\}\{\:\"\?\>\<]+$");
        if (regex.test(nextChar)){
            if(nextChar==nextChar.toUpperCase()){
                shiftkey=16;
            }
        }
        if(nextCharCode==''){
            nextCharCode=nextChar.charCodeAt(0);
        }
        //alert("nextcharcodetest"+nextCharCode);
        var wrongkeyfinal=$(".box-lesson-wrong").text();
        
        var goingnewnewkey_val=$(".box-lesson-goingnewnew").text();
        if(goingnewnewkey_val==""){
            var goingnewnewkey=$(".box-lesson-goingnew").text();
        }else{
            var goingnewnewkey=$(".box-lesson-goingnewnew").text();
        }

        var highlightfirstwrong=wrongkeyfinal.charCodeAt(0);
        var highlightsecondwrong=goingnewnewkey.charCodeAt(0);
        if(highlightfirstwrong!="" && highlightfirstwrong!=NaN){
           
            $(".keyboard-bg").find(".newkey-"+highlightfirstwrong).parent().removeClass("keyHighlightnew");
            $(".keyboard-bg").find(".newkey-"+highlightfirstwrong).parent().addClass("keyHighlightnew");
        }
        if(highlightsecondwrong!="" && highlightsecondwrong!=NaN){
            $(".keyboard-bg").find(".newkey-"+highlightsecondwrong).parent().removeClass("keyHighlightnew");
            $(".keyboard-bg").find(".newkey-"+highlightsecondwrong).parent().addClass("keyHighlightnew");
          
        }
        if(wrongkeyfinal!=""){
         
            var wreongfinalallval=wrongkeyfinal.charCodeAt(0);
            var asciinewwrong=newkeypress.charCodeAt(0);
            if(asciinewwrong!=wreongfinalallval){
               
            jQuery('.keyboard-bg').find('.newkey-'+asciinewwrong).parent().addClass('blinkone');
            setTimeout(function(){
                jQuery('.keyboard-bg').find('.blinkone').removeClass('blinkone');  
            },300);
            }
            // end
            jQuery('.newkeyboardset').find('.keydisplayfinger').removeClass('keydisplayfinger');
            jQuery('.newkeyboardset').find('.newhandkey-'+wreongfinalallval).addClass('keydisplayfinger');
        }
        else if(goingnewnewkey!=""){
           
            var ascinewkeypress=newkeypress.charCodeAt(0);
            var goingnewnewallval=goingnewnewkey.charCodeAt(0);
            //alert("ascinewkeypress"+ascinewkeypress);
            // alert("goingnewnewallval"+goingnewnewallval);
            var goingnewkeyvaldatanew=$(".box-lesson-goingnewnew").prev().text();
            //alert("goingnewkeyvaldatanew"+goingnewkeyvaldatanew);
            var currentgoingnewvaluenew=$(".box-lesson-goingnew").prev().text();
            var goingnewww=$(".box-lesson-goingnewnew").text();
            var currentgoingnewvaluenew=currentgoingnewvaluenew.replace('\xa0', ' ');
            
           //alert("goingnewww"+goingnewww);

            //if(goingnewkeyvaldatanew!=)
            // alert("goingnewkeyvaldatanew"+goingnewkeyvaldatanew);
            // alert("currentgoingnewvaluenew"+currentgoingnewvaluenew);
            // alert("newkeypress"+newkeypress);
            //alert("goingnewkeyvaldatanew"+goingnewkeyvaldatanew);
            //alert("currentgoingnewvaluenew"+currentgoingnewvaluenew);
            /*new code for solve the new highlight red*/

            /*end*/
            //alert("new key press"+newkeypress);
            //alert("goingnewkeyvaldatanew"+goingnewkeyvaldatanew);
           
            if(goingnewkeyvaldatanew!=""){
                
                if(newkeypress!=goingnewkeyvaldatanew ){
                    // alert('newkey-'+ascinewkeypress);
                jQuery('.keyboard-bg').find('.newkey-'+ascinewkeypress).parent().addClass('blinkone');
            setTimeout(function(){
            jQuery('.keyboard-bg').find('.blinkone').removeClass('blinkone');	
        },300);
            }
            }

            /*code for blink*/
            if(goingnewww!=""){
                    if((goingnewww!=newkeypress) ){
                // alert("newww");
            var asciigoingnewvaldta=goingnewww.charCodeAt(0);	
            // alert(ascinewkeypress);
            jQuery('.keyboard-bg').find('.newkey-'+ascinewkeypress).parent().addClass('blinkone');
            setTimeout(function(){
            jQuery('.keyboard-bg').find('.blinkone').removeClass('blinkone');	
        },300);
            }
            }
        
            /*end*/
            if(currentgoingnewvaluenew!=""){
                
                if((newkeypress!=currentgoingnewvaluenew)){
                    
                jQuery('.keyboard-bg').find('.newkey-'+ascinewkeypress).parent().addClass('blinkone');
            setTimeout(function(){
            jQuery('.keyboard-bg').find('.blinkone').removeClass('blinkone');	
        },300);
            }
            }
            
        // 	if(ascinewkeypress!=goingnewnewallval){
        // 	var goingnewkeyvaldata=$(".goingnewnew").text();
        // 	var currentgoingnewvalue=$(".goingnew").text();
        // 	if(newkeypress==goingnewkeyvaldata && newkeypress==currentgoingnewvalue ){
        // 		jQuery('.keyboard-bg').find('.newkey-'+ascinewkeypress).parent().addClass('blinkone');
        // 	setTimeout(function(){
        // 	jQuery('.keyboard-bg').find('.blinkone').removeClass('blinkone');	
        // },300);
        // 	}else{
        // 		var rightkeypress=$('.activeLessonLine span:last-child').find('.rightnew').text();
        // 		var asciinewrightpress=rightkeypress.charCodeAt(0);
        // 		if(asciinewrightpress!=ascinewkeypress){
                    
        // 			jQuery('.keyboard-bg').find('.newkey-'+ascinewkeypress).parent().addClass('blinkone');
        // 	setTimeout(function(){
        // 	jQuery('.keyboard-bg').find('.blinkone').removeClass('blinkone');	
        // },300);
        // 		}

                

        // 	}
            
        // 	}
            jQuery('.newkeyboardset').find('.keydisplayfinger').removeClass('keydisplayfinger');
            jQuery('.newkeyboardset').find('.newhandkey-'+goingnewnewallval).addClass('keydisplayfinger');	
            }else{
            // alert("fgoinddhddhgdhdg");
        jQuery('.keyboard-bg').find('.blinkclass').removeClass('blinkclass');
        jQuery('.newkeyboardset').find('.keydisplayfinger').removeClass('keydisplayfinger');
        jQuery('.newkeyboardset').find('.newhandkey-'+nextnewcharater).addClass('keydisplayfinger');	
                            var matchleftkeypress=lefthand.indexOf(nextChar);
                            var matchrightkeypress=righthand.indexOf(nextChar);
                            var shiftkey=shiftrequired.indexOf(nextCharCode);
                            //alert("matchrightkeypress"+shiftkey);
                            if(matchleftkeypress!=-1){
                            $("#f_defaultnew").hide();
                            $("#j_defaultnew").show();
                            }
                            if(matchrightkeypress!=-1){
                            $("#j_defaultnew").hide();
                            $("#f_defaultnew").show();

                            }
                            /*end*/
        }
        jQuery('.keyboard-bg').find('.keyHighlight').removeClass('keyHighlight');
        jQuery('.keyboard-bg').find('.newkey-'+nextnewcharater).parent().addClass('keyHighlight');
        var firstwrongkey=jQuery(".box-lesson-wrong").text();
        var nextagainwrong=jQuery(".box-lesson-goingnewnew").text();
        if(firstwrongkey!=""){
        var firstwrongkeyleft=leftshiftkey.indexOf(firstwrongkey);
        var firstwrongightkey=rightshiftkey.indexOf(firstwrongkey);
        if(firstwrongkeyleft>=0){
            $(".keyboard-bg").find("#shift_rightnew").children().removeClass("shiftrighttextcolor");
            $(".keyboard-bg").find("#shift_leftnew").children().addClass("shiftlefttext");
            jQuery(".keyboard-bg").find("#shift_rightnew").removeClass("keyHighlightnewshift");
            jQuery(".keyboard-bg").find("#shift_leftnew").addClass("keyHighlightnewshift");
            //$(".keyboard-bg").find("#shift_leftnew").addClass("keyHighlightnewshift");
        }
        if(firstwrongightkey>=0){
            $(".keyboard-bg").find("#shift_rightnew").children().addClass("shiftlefttext");
            $(".keyboard-bg").find("#shift_leftnew").children().removeClass("shiftrighttextcolor");
            jQuery(".keyboard-bg").find("#shift_leftnew").removeClass("keyHighlightnewshift");
            jQuery(".keyboard-bg").find("#shift_rightnew").addClass("keyHighlightnewshift");
            jQuery(".keyboard-bg").find("#shift_leftnew").removeClass("keyHighlightnewshift");
        }
        }
        if(nextagainwrong!=""){
        var secondnextkeyleft=leftshiftkey.indexOf(nextagainwrong);
        var secondnextkeyfinal=rightshiftkey.indexOf(nextagainwrong);
        if(secondnextkeyleft>=0){
            $(".keyboard-bg").find("#shift_rightnew").children().removeClass("shiftrighttextcolor");
            $(".keyboard-bg").find("#shift_leftnew").children().addClass("shiftlefttext");
            jQuery(".keyboard-bg").find("#shift_rightnew").removeClass("keyHighlightnewshift");
            jQuery(".keyboard-bg").find("#shift_leftnew").addClass("keyHighlightnewshift");
        
        }
        if(secondnextkeyfinal>=0){ 
            $(".keyboard-bg").find("#shift_rightnew").children().addClass("shiftrighttextcolor");
            $(".keyboard-bg").find("#shift_leftnew").children().removeClass("shiftlefttext");
            jQuery(".keyboard-bg").find("#shift_rightnew").addClass("keyHighlightnewshift");
            jQuery(".keyboard-bg").find("#shift_lefttnew").removeClass("keyHighlightnewshift");
        }	
        }
    //   var nextChar=jQuery(".lesson-content").find('div:nth-child(1)').find('span:nth-child(1)').text();
        
        var matchleftkeypress=lefthand.indexOf(nextChar);
        var matchrightkeypress=righthand.indexOf(nextChar);
        var spacekeysnew=righthand.indexOf(nextCharCode);
        var shiftkey=shiftrequired.indexOf(nextChar);
        var leftshiftkeynew=leftshiftkey.indexOf(nextChar);
        var rightshiftkeynew=rightshiftkey.indexOf(nextChar);
        //alert(nextCharCode);
        if(nextCharCode==13){
        $(".newhandkey-left").hide();
        $(".newhandkey-right").hide();
        $("#j_defaultnew").hide();
        $(".newhandkey-32").show();	
        $("#f_defaultnew").show();
        $(".keyboard-bg").find(".newkey-32").parent().addClass("keyHighlight");
        }
        if(shiftkey==-1){
        if(nextCharCode!="32")  
        {
            if(matchleftkeypress!=-1)
            {
                $(".newhandkey-32").hide();	
                $(".newhandkey-15 ").hide();		
                $("#f_defaultnew").hide();
                $(".newhandkey-left").hide();
                $(".newhandkey-right").hide();
                $("#j_defaultnew").show();
            }
            if(matchrightkeypress!=-1)
            {//$(".keyboard-bg").find(".newkey-32").parent().removeClass("keyHighlight");
                $(".newhandkey-32").hide();	
                $(".newhandkey-15 ").hide();
                $("#j_defaultnew").hide();
                $(".newhandkey-left").hide();
                $(".newhandkey-right").hide();
                $("#f_defaultnew").show();  
            }
            }
            else
            {
            //$(".keyboard-bg").find(".newkey-32").parent().removeClass("keyHighlight");
            $(".newhandkey-32").hide();	
            $(".newhandkey-15 ").hide();
            $("#j_defaultnew").hide();
            $(".newhandkey-left").hide();
            $(".newhandkey-right").hide();
            $("#f_defaultnew").show(); 
            }
            }else{
                if(leftshiftkeynew!=-1){
                $(".newhandkey-32").hide();	
                $("#j_defaultnew").hide();
                $("#f_defaultnew").hide(); 
                // $(".newhandkey-left").hide();
                jQuery('.newkeyboardset').find('.newhandkey-left').removeClass('keydisplayfinger');
                $(".keyboard-bg").find("#shift_rightnew").children().removeClass("shiftrighttextcolor");
                $(".keyboard-bg").find("#shift_leftnew").addClass("keyHighlight");
                $(".keyboard-bg").find("#shift_leftnew").children().addClass("shiftlefttext");
                // $(".newhandkey-left").show();
                jQuery('.newkeyboardset').find('.newhandkey-left').addClass('keydisplayfinger');
                }
                if(rightshiftkeynew!=-1){
                $(".newhandkey-32").hide();	
                $("#j_defaultnew").hide();
                $("#f_defaultnew").hide(); 
                // $(".newhandkey-right").hide();
                jQuery('.newkeyboardset').find('.newhandkey-right').removeClass('keydisplayfinger');
                $(".keyboard-bg").find("#shift_leftnew").children().removeClass("shiftlefttext");
                $(".keyboard-bg").find("#shift_rightnew").children().addClass("shiftrighttextcolor");
                $(".keyboard-bg").find("#shift_rightnew").addClass("keyHighlight");
                // $(".newhandkey-right").show();
                jQuery('.newkeyboardset').find('.newhandkey-right').addClass('keydisplayfinger');
                }
            }
            if(nextCharCode==34){
             $("#j_defaultnew").hide();
              $("#f_defaultnew").hide(); 
                // jQuery('.newkeyboardset').find('.newhandkey-32').removeClass('keydisplayfinger');  
            $(".keyboard-bg").find("#shift_rightnew").children().removeClass("shiftrighttextcolor");
            $(".keyboard-bg").find("#shift_leftnew").addClass("keyHighlight");
            $(".keyboard-bg").find("#shift_leftnew").children().addClass("shiftlefttext");
            //change on 27-09
             jQuery('.newkeyboardset').find('.newhandkey-left').addClass('keydisplayfinger');
             jQuery('.newkeyboardset').find('.newhandkey-right').hide();
            // jQuery('.newkeyboardset').find('.newhandkey-32').removeClass('keydisplayfinger');

            }
            if(nextCharCode==39){
                $("#shift_leftnew").removeClass('keyHighlightnew keyHighlight');

            }
            var nextfindFinger=$('.newkey-'+nextCharCode).attr('data-finger');
            var nextfindHand=$('.newkey-'+nextCharCode).attr('data-hand');
            $('.lHfingerCircle').css('display','none');
            if(shiftkey!=''){
            if(nextfindHand=='left'){var shiftHand='rightnew';}else{var shiftHand='left';}
            if(jQuery('.keyboard-bg').find('.newkey-'+shiftkey).hasClass(shiftHand)){
                jQuery('#'+shiftHand+'Shift').addClass('keyHighlight');
                var findShiftFinger=jQuery('#'+shiftHand+'Shift').attr('data-finger');
                $('.'+findShiftFinger).css('display','block');	
            }				
            }
            $('.'+nextfindFinger).css('display','block');
            nextCharCode='';
            shiftkey='';
            //var lastspanchild=$(".startLine span:last-child").find(".goingnewnew").length;
            //alert(lastspanchild);

            /*code for last class*/
            // var lastclass = $('.activeLessonLine span:last-child').attr('class'); 
            // if(lastclass == 'letter goingnewnew'){
            //  $('.activeLessonLine span:last-child').removeClass('goingnewnew').addClass('goingnew');
            //  $("#shift_left").hide();
            //  $("#shift_right").hide();
            //  $("#space").show();
            //  $("#f_defaultnew").show();
            // // $("#space").addClass("keyHighlightnew");  
            // $(".newkey-32").parent().addClass("keyHighlightnew");

            // }
            var lastclassnew = $('.activeLessonLine span:last-child').attr('class'); 
            // if(lastclassnew=="box-lesson-letter box-lesson-goingnew"){
            // $(".newkey-32").parent().addClass("keyHighlightnew");
            // jQuery('.newkeyboardset').find('.newhandkey-32').addClass('keydisplayfinger');
            // }
            /*end*/
         
          
            
    
    

});
// jQuery(document).keyup(function(e){
//     //    alert('up');
//         fired = false;
//     });
   
    
    jQuery(document).on('click', '#guestprint', function(){
        jQuery("#guestprintform").submit();
    });

    
    jQuery(document).on('click', '#keyboardHideView', function(){
        $('#keyboard-content').css('display','none');
        jQuery("#keyboardHideView").css('display','none');
        jQuery("#keyboardShowView").css('display','block');
    });
    jQuery(document).on('click', '#keyboardShowView', function(){
        $('#keyboard-content').css('display','block');
        jQuery("#keyboardHideView").css('display','block');
        jQuery("#keyboardShowView").css('display','none');
    });
    
    
});

   



function blink() {
$('.keyHighlight').fadeOut('slow', function() {  
    $(this).fadeIn('slow', function() {
        blink(this);
    });
});
}

/*code blink red*/
function blinknew() {
$('.blinkclass').fadeOut('slow', function() {
    $(this).fadeIn('slow', function() {
        blink(this);
    });
});
}

/*code for toggle button*/
    
    /*end*/
    // var minutesLabel = document.getElementById("minutes");
    // var secondsLabel = document.getElementById("seconds");
    // var totalSeconds = 0;
    // setInterval(setTime, 1000);
    
    // function setTime() {
    //   ++totalSeconds;
    //   secondsLabel.innerHTML = pad(totalSeconds % 60);
    //   minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
    // }
    
    // function pad(val) {
    //   var valString = val + "";
    //   if (valString.length < 2) {
    //     return "0" + valString;
    //   } else {
    //     return valString;
    //   }
    // }
function pad ( val ) { return val > 9 ? val : "0" + val; }

// function cTimer(){
//     var sec = 0;
//   setInterval( function(){
//         $("#seconds").html(pad(++sec%60));
//        $("#minutes").html(pad(parseInt(sec/60,10)));
//     }, 1000);
// }

function realtimeScore(){
    var sec = 0;
    var realtime= setInterval( function(){
           $("#seconds").html(pad(++sec%60));
          $("#minutes").html(pad(parseInt(sec/60,10)));
       }, 1000);
    var realscore  =setInterval(function(){ 
        var correct = 0;	
        var wrong = 0;	
        var total = 0;
        var grosswpm = 0;
        var netwpm = 0;
        var realtimenetwpm = 0;
        var accuracy = 0;
        var errorrate = 0;
        var time = 0;
        var min=(jQuery("#minutes").text());
        var secc=(jQuery("#seconds").text());
        var real=((parseInt(min)*60)+parseInt(secc));
         var finalt=(real/60);
        // if(window.flag == 0){
        //     window.settypetime = finalt+1;	
        //     //  window.remainingtypetime = window.settypetime+1;	
        //     window.flag = 1;
        // }
        
        // window.remainingtypetime = ++window.remainingtypetime;
        // window.usedtypetime = (window.settypetime + window.remainingtypetime);
         window.usedtypetime = window.settypetime;
        correct = window.correct;	
        wrong = window.wrong;	
        
        total = correct + wrong;
        grosswpm = ((total)/5);	
        netwpm = (grosswpm- (wrong/5));
        realtimenetwpm = (netwpm / finalt);
        accuracy = (correct/total)*100;
        errorrate = (wrong/total)*100;
        
        if(isNaN(realtimenetwpm) || realtimenetwpm < 0){
            window.realtimenetwpm = 0; 
        }else{
            window.realtimenetwpm = realtimenetwpm; 
        }
        
        jQuery("#wpm").text(Math.floor(window.realtimenetwpm));
        jQuery("#accuracy").text(Math.floor(accuracy)+'%');
    
        var result=setInterval(function(){
            if(jQuery('.lesson-content-box').find('.lesson-line:last').find('.box-lesson-letter:last').hasClass('box-wronglesson') || jQuery('.lesson-content-box').find('.lesson-line:last').find('.box-lesson-letter:last').hasClass('box-lesson-wrongnew') || 
            jQuery('.lesson-content-box').find('.lesson-line:last').find('.box-lesson-letter:last').hasClass('box-lesson-wrong') || jQuery('.lesson-content-box').find('.lesson-line:last').find('.box-lesson-letter:last').hasClass('box-lesson-rightnew'))
            {   
                var typetime = (jQuery("#timer").text());
                var minute=(jQuery("#minutes").text());
                var second=(jQuery("#seconds").text());
                scoreCard(typetime,minute,second);
                clearInterval(realscore);
                clearInterval(result);
                clearInterval(realtime);
            }
        });
  
        
    }, 1000);
}
function scoreCard(typetime,minute,second){
    var total_section=$('#total_Section').val();
    var section_id=$('#section_id').val();
    var nextvalue=parseInt(section_id)+1;
    var lesson_id=$('#lesson_id').val();
    var lesson_name=$('#lesson_name').val();
    var next_lesson=parseInt(lesson_id)+1;
    var star=0;
   var totalstar=0;
   var actualstar=0;
   
    var speed;

    var rating;

    var testname = jQuery("#testname").val();
   
   
     var realtime=((parseInt(minute)*60)+(parseInt(second)));
  
    var finaltime=(realtime/60);
    // var typetime = (jQuery("#seconds").text()/60);

    var correct = window.correct;	

    var wrong = window.wrong;	

    

    var total = correct + wrong;

  var grosswpm = ((total/5)/finaltime);
    // var grosswpm = (total/5);

    var netwpm = (grosswpm - (wrong/finaltime));
    // var wpm=(60/realtime)*grosswpm;



    if(netwpm < 0){

        netwpm = 0;

    }



    // var accuracy =((netwpm/grosswpm)*100);
    var accuracy=((correct/total)*100);
    var accur=Math.floor(accuracy);
    var errorrate = (wrong/total)*100;
    
    var html='';
    jQuery(".starsholder").empty();
    if(accur >= 0 && accur <= 40){
        for(var i=0;i<1;i++)
        {
           html+='<div class=" staron"><img src="'+base_url+'/templates/dojo/img/rating-on.svg" class="star"></div>';
       

        }
        for(var j=1;j<5;j++)
        {
           html+='<div class=" staroff"><img src="'+base_url+'/templates/dojo/img/rating-off.svg" class="star"></div>';
        }
       jQuery(".scoreannouncmnt .starcount").html('1');
       jQuery(".remarks_large").html('Slow');
       star=1;
	}else if(accur >= 41 && accur <= 60){
        for(var i=0;i<2;i++)
        {
           html+='<div class=" staron"><img src="'+base_url+'/templates/dojo/img/rating-on.svg" class="star"></div>';
        }
        for(var j=2;j<5;j++)
        {
           html+='<div class=" staroff"><img src="'+base_url+'/templates/dojo/img/rating-off.svg" class="star"></div>';
        }
        jQuery(".scoreannouncmnt .starcount").html('2');
        jQuery(".remarks_large").html('Average');
        star=2;
	}else if(accur >= 61 && accur <= 80){
        for(var i=0;i<3;i++)
        {
           html+='<div class=" staron"><img src="'+base_url+'/templates/dojo/img/rating-on.svg" class="star"></div>';
        }
        for(var j=3;j<5;j++)
        {
           html+='<div class=" staroff"><img src="'+base_url+'/templates/dojo/img/rating-off.svg" class="star"></div>';
        }
        jQuery(".scoreannouncmnt .starcount").html('3');
        jQuery(".remarks_large").html('Good');
        star=3;
	}else if(accur >= 81 && accur <= 95){
        for(var i=0;i<4;i++)
        {
           html+='<div class=" staron"><img src="'+base_url+'/templates/dojo/img/rating-on.svg" class="star"></div>';
        }
        for(var j=4;j<5;j++)
        {
           html+='<div class=" staroff"><img src="'+base_url+'/templates/dojo/img/rating-off.svg" class="star"></div>';
        }
        jQuery(".scoreannouncmnt .starcount").html('4');
        jQuery(".remarks_large").html('Fast');
        star=4;
	}else if(accur >= 96 && accur <= 100){
        for(var i=0;i<5;i++)
        {
           html+='<div class=" staron"><img src="'+base_url+'/templates/dojo/img/rating-on.svg" class="star"></div>';
        }
        
        jQuery(".scoreannouncmnt .starcount").html('5');
        jQuery(".remarks_large").html('Professional');
        star=5;
    }
    // var totalstar=jQuery("#lesson_star").val();
    // totalstar=parseInt(totalstar);
    // totalstar+=star;
    // console.log(totalstar);
   
    var lesson_cookie=Cookies.get(lesson_name);
   
    // if(total_section==nextvalue)
    // {
    //     // $('.continue').remove();
    //     Cookies.remove(lesson_name);
    
    // }
    // else{
        var wpm=Math.floor(grosswpm);
        var starval=jQuery("#lesson_star").val();
        var timeval=jQuery("#lesson_time").val();
        var wpmval=jQuery("#lesson_wpm").val();
        var speedval=jQuery("#lesson_speed").val();
        var section_no=jQuery("#section_no").val();
        var lesson_title=jQuery("#lesson_title").val();
        totalstar=(parseInt(starval)+parseInt(star));
        totaltime=(parseInt(timeval)+parseInt(realtime));
        totalwpm=(parseInt(wpmval)+wpm);
        totalspeed=(parseInt(speedval)+parseInt(accur));
        if(jQuery("#islogin").val() == 1)
        {
            jQuery(".callout ").remove();
            jQuery.ajax({
                url: base_url+'/ajax.php',
                data: {'p':'sectionscore','lesson_name':lesson_name,'lesson_title':lesson_title,'next':nextvalue,'lesson_star':totalstar,'time':totaltime,'speed':totalspeed,'wpm':totalwpm,'lesson_completed':nextvalue,'prevstar':star,
                        'prevtime':realtime,'prevspeed':accur,'prevwpm':wpm,'section_no':section_no,section_load: "0"},

                type:"POST",
                cache:false,
                dataType: "json",
                success: function(response){

    
                    // console.log(response);
    
                    // console.log("Success");
    
                },
    
                error: function(response){
    
                    // console.log("Error");
    
                }
            });
            
        }
        else
        {
            var cookie = [
                { next:  nextvalue ,redo: section_id , sec_id: "0",lesson_star: totalstar,time: totaltime,speed: totalspeed,wpm: totalwpm,lesson_completed:nextvalue,prevstar:star,
                prevtime:realtime,prevspeed:accur,prevwpm:wpm,section_load: "0"
                }
                
            ];
            Cookies.set(lesson_name, JSON.stringify(cookie));
        }
       
        // console.log(JSON.parse(Cookies.get(lesson_name)));
    // } 
    jQuery(".starsholder").append(html);

    
    jQuery(".lesson-content-box,.keyboard-setting,.keyboard-container").css('display', 'none');

    jQuery(".result-block").css('display', 'block');

    jQuery(".result-block-test").css('display', 'block');

    

    jQuery("table tr td:eq(1)").text(total);

    jQuery("table tr td:eq(3)").text(correct);

    jQuery("table tr td:eq(5)").text(wrong);

    jQuery("table tr td:eq(7)").text(Math.floor(errorrate));

    jQuery("table tr td:eq(9)").text(Math.floor(grosswpm));

    

    jQuery("#netwpm").html(Math.floor(grosswpm)+'<sub>WPM</sub>');

    jQuery("#finalaccuracy").html(Math.floor(accuracy)+'<sub>%</sub>');
    jQuery("#timetaken").html(typetime);


    jQuery("#grosswpm").val(Math.floor(grosswpm));

    jQuery("#faccuracy").val(Math.floor(accuracy));

    jQuery("#speed").val(Math.floor(netwpm));

    

    // if(jQuery("#islogin").val() == 1){

    //     var today = new Date();

    //     var dd = today.getDate();

    //     var mm = today.getMonth()+1; //January is 0!

    //     var yyyy = today.getFullYear();

        

    //     if(dd<10) {

    //         dd='0'+dd

    //     } 

        

    //     if(mm<10) {

    //         mm='0'+mm

    //     } 



    //     today = yyyy+'-'+mm+'-'+dd;

    //     speed = Math.floor(netwpm);



    //     if(speed >= 0 && speed <= 10){

    //         rating = 1;

    //     }else if(speed >= 11 && speed <= 30){

    //         rating = 2;

    //     }else if(speed >= 31 && speed <= 40){

    //         rating = 3;

    //     }else if(speed >= 41 && speed <= 60){

    //         rating = 4;

    //     }else if(speed >= 61){

    //         rating = 5;

    //     }

        

    //     // jQuery.ajax({

    //     //     url: base_url+'/ajax.php',

    //     //     data: {'p': 'scoresave', 'testname': testname, 'date': today, 'length': typetime, 'speed': speed, 

    //     //            'accuracy': Math.floor(accuracy), 'rating': rating},

    //     //     type:"POST",

    //     //     cache:false,

    //     //     dataType: "json",

    //     //     success: function(response){

    //     //         jQuery("#userprint").attr('href', base_url+'/'+response.certificate_id+'/user-pdf.html');

    //     //         jQuery("#userprint").attr('target', '_blank');

    //     //         console.log(response);

    //     //         console.log("Success");

    //     //     },

    //     //     error: function(response){

    //     //         console.log("Error");

    //     //     }

    //     // }); 

    // }

}



                 
