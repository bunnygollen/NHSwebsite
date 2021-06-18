function myFunction() 
{
    var first = document.getElementById("fname").value.toUpperCase();
    var middle = document.getElementById("mname").value.toUpperCase();
    var last = document.getElementById("lname").value.toUpperCase();
    if(first.slice(first.length-1,first.length).localeCompare(" ")==0)
    {
      first = first.slice(0,first.length-1);
    }
    if(middle.slice(middle.length-1,middle.length).localeCompare(" ")==0)
    {
      middle = middle.slice(0,middle.length-1);
    }
    if(last.slice(last.length-1,last.length).localeCompare(" ")==0)
    {
      last = last.slice(0,last.length-1);
    }
    var xmlhttp = new XMLHttpRequest();
    var result = null;
    xmlhttp.open("GET", "spring_semester_data.txt", false);
    xmlhttp.send();
    if (xmlhttp.status==200) {
      result = xmlhttp.responseText;
    }
    //search for club member information
    //if the falldata checkbox is checked
    var checked = document.getElementById("fallData").checked;
    var start=0;
    if(checked)
      start=result.indexOf("Fall Semester Data");
    var pos = result.indexOf(first+" "+middle+" "+last, start); //found person
    var namleng= first.length+middle.length+last.length+3; // length of name
    var hr = result.indexOf("/",pos); //hours position (+1)
    var req = result.slice(hr+1,result.indexOf(" ",hr));
    var hours = result.slice(pos+namleng+6,hr); //hours with nhs
    var withNHS = result.slice(result.indexOf("/",hr+1)-1,result.indexOf("/",hr+1));
    var NHSreq = result.slice(result.indexOf("/",hr+1)+1,result.indexOf(" ",result.indexOf("/",hr+1)));
    var findSACs = result.indexOf("sac",pos);
    var SACs = result.slice(findSACs-1,findSACs);
    var end = result.indexOf("|",pos); 
    var placeEnd = result.indexOf("|", end+1);
    var reason = result.slice(findSACs+4,end);

    //find number of places volunteered at
    if(hours.localeCompare("0")!=0)
    {
        
        var places = result.slice(end+1,placeEnd).toString().split(",");
  
        console.log(places);
        document.getElementById("displayPlaces").innerHTML="You've volunteered at "+places;
    }
    else
    {
        document.getElementById("displayPlaces").innerHTML="Check out the Volunteer page for potential volunteering opportunities!";
    }

    //If they put in a name correctly (aka not just first name lol)
    if(pos!=-1 && namleng>3 && first.length>0 && last.length>0)
    {
        if(first.includes(" "))
        {
            var dispName = first.slice(0,1)+first.slice(1,first.indexOf(" ")).toLowerCase()+" "+first.slice(first.indexOf(" ")+1,first.indexOf(" ")+2)+first.slice(first.indexOf(" ")+2,first.length).toLowerCase();
        }
        else
        var dispName = first.toString().slice(0,1)+first.toString().slice(1,first.length).toLowerCase();
        document.getElementById("displayName").innerHTML="Hello "+dispName+"!";
        var dues = result.slice(pos+namleng+4,pos+namleng+5);
        //paid dues? (Y/N), only consider if not a senior
        if(dues.localeCompare("Y")!=0)
        {
          document.getElementById("displayDues").innerHTML="**It seems you have not played dues. Please message an officer if you think this is a mistake.";
          document.getElementById("displayDues").style.fontWeight="bold";
        }
        document.getElementById("displayName").style.fontWeight="bold";
        document.getElementById("displayName").style.fontSize="200%";
        document.getElementById("displayName").style.paddingBottom = "1vw";
        document.getElementById("displayName").style.borderBottom = "4px solid #26a89d";
        document.getElementById("catCeleb").style.opacity=0;
        document.getElementById("displayCompletion").innerHTML="";
        document.getElementById("displayHours").innerHTML="<b>Regular Hours:</b> "+hours+" out of "+req;
        document.getElementById("displaywithNHS").innerHTML="<b>Hours with NHS:</b> "+withNHS+" out of "+NHSreq;
        document.getElementById("displaySACs").innerHTML="<b>SACs: </b>"+SACs;
        var inthrs = parseInt(hours,10);
        var intSACs = parseInt(SACs,10);
        var intwNHS = parseInt(withNHS,10);
        
        if(checked)
        {
          if(intSACs>0)
          {
              document.getElementById("displaySacReason").innerHTML = "<b>Past SACs: </b>"+reason;
          }
          if(inthrs>=req && intSACs<3 && intwNHS==5 && result.slice(end,placeEnd).includes(","))
          {
              document.getElementById("displayCompletion").innerHTML=
              "<br> Congrats! You fulfilled NHS requirements in the fall semester."
              document.getElementById("catCeleb").style.opacity=1;
              document.getElementById("catCeleb").style.width="8vw";
          }
          else
          {
            //Change the 3 to your new SAC max
              if(intSACs>=3)
              {
                  document.getElementById("displayCompletion").innerHTML = "Sorry, but you have been removed from NHS for having 3 or more SACs. Please message an officer if you believe this is a mistake.";
              }
              else
              {
                document.getElementById("displayCompletion").innerHTML=
                "It seems you missed something in the fall semester. :("
                document.getElementById("displayCompletion").style.lineHeight=1.25;
                
              }
          }
        }
        else
        {
          if(intSACs>0)
          {
              document.getElementById("displaySacReason").innerHTML = "<b>Past SACs: </b>"+reason;
          }
          //Change the 3 to your new SAC max
          if(inthrs>=req && intSACs<3 && intwNHS>=NHSreq && result.slice(end,placeEnd).includes(","))
          {
              document.getElementById("displayCompletion").innerHTML=
              "<br> Congrats! You fulfilled NHS requirements!"
              document.getElementById("catCeleb").style.opacity=1;
              document.getElementById("catCeleb").style.width="8vw";
          }
          else
          {
              if(intSACs>=3)
              {
                  document.getElementById("displayCompletion").innerHTML = "Sorry, but you have been removed from NHS for having 3 or more SACs. Please message an officer if you believe this is a mistake.";
              }
              else
              {
                document.getElementById("displayCompletion").innerHTML = "<br><i>I wonder what happens when I get all the requirements?</i> 😳😳😳"
              }
          }
        }
    }
    //if they didn't put in a name or something
    else
    {
        if(namleng==3)
        {
            alert("Please enter your name!");
        }
        else if(first.length==0)
        {
          alert("Please enter your full name!");
        }
        else if(last.length==0)
        {
          alert("Please enter your full name!");
        }
        else
        alert("Sorry, couldn't find you in the database, check spelling?");
    }
}

