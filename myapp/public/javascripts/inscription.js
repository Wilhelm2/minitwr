var Env=document.getElementById('Utilisateur');
    Env.addEventListener('blur',function()
		{
                    if (document.getElementById('Utilisateur').value.lenght<8)
                        {
                            alert('L\'utilisateur doit avoir 8 caractères minimum');
                           
                        } 
		},false);


                    
