function Hour () 
	{
		d = new Date();
		h = d.getHours();
		min = d.getMinutes();
		s = d.getSeconds();
        if (h<10) h='0'+h;
        if (min<10) min = '0'+min;
        if (s<10) s = '0'+s;
		txt = h + ": " + min + ": " + s;
		Calk.innerHTML = txt;
		setTimeout("Hour()", 1000);
	}
