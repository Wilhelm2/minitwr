function Hour () 
	{
		d = new Date();
		h = d.getHours();
		min = d.getMinutes();
		s = d.getSeconds();
		txt = h + ": " + min + ": " + s;
		Calk.innerHTML = txt;
		setTimeout("Hour()", 1000);
	}
var Env=document.getElementById('Envoyer');
		Env.addEventListener('click',function()
		{
			var dat=new Date();
			document.getElementById('ZoneTexte').innerHTML+='<p>'+document.getElementById('Nom').value+' a écrit à :'+dat.getHours()+':'+dat.getMinutes()+':'+dat.getSeconds()+':</br>'+document.getElementById('Twrer').value+'</p>';
			document.getElementById('Twrer').value='';
		},false);
