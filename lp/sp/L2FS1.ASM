sseg		segment	stack
		db	   	256 dup (?)
sseg		ends
 
dseg	 	segment
	newcat		db		'\chaliy',0
	newfile  	db    	'mike',0
	textbuf		db		'Vasiliy'
	rootcat 	db     	'c:\',0
	error_msg	db		'Unhandled error occured$'
dseg		ends	
 
cseg		segment
		assume		cs:cseg,ds:dseg,ss:sseg
start:		
	jmp		main
main:		
	push	ds
	mov		ax,0
	push	ax
	mov		ax,dseg
	mov		ds,ax

  	; Create new catalog
	mov		dx, offset newcat
	mov		ah,39h
	int		21h
	jc		erop

  	; Change directory to new catalog
	mov		dx, offset newcat
	mov		ah,3bh
	int		21h
	jc		erop
  	; Create new file
	mov		dx, offset newfile
	mov		cx,0	
	mov		ah,5bh
	int		21h
	jc		erop
	mov		bx,ax ; Store handle

  	; Write textbuf to file
	mov		dx, offset textbuf
	mov		cx,7
	mov		ah,40h
	int		21h
	jc		erop

  	; Close file
	mov		ah,3eh
	int		21h
	jc		erop

  	; Change directory to root
    mov      dx, offset rootcat 
    mov 	 ah,3bh
    int 	 21h
    jc		 erop

exit:
	mov		ax,4c00h ; Exit all good
	int		21h
 
erop:
	mov		dx, offset error_msg
	mov		ah,9
	int		21h	
	jmp		exit
cseg		ends
		end		start