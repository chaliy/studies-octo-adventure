sseg	segment	stack			; опис стеку
	db	256 dup (?)
sseg	ends

dseg	 	segment
	cat			db		'\chaliy',0
	file  		db    	'mike',0
	buf	  		db		7 dup(?), '$'
	rootcat 	db     	'c:\',0
	error_msg	db		'Unhandled error occured$'
dseg		ends	

cseg	segment
	assume	cs:cseg,ds:dseg,ss:sseg

start:	
	jmp	main
main:	
	push ds
	mov	ax,0
	push ax
	mov	ax,dseg
	mov	ds,ax

  	; Change directory to cat
	mov	dx,offset cat
	mov	ah,3bh
	int	21h
	jc	erop

 	; Open file
	mov	dx,offset file
	mov	al,0
	mov cx,0
	mov	ah,3dh
	int	21h
	jc	erop
	mov	bx,ax

 	; Read file
	mov	dx,offset buf
	mov	cx,8
	mov	ah,3fh
 	int	21h
	jc	erop

 	; Print
	mov	ah,9
	int	21h

 	; Close file
	mov	ah,3eh
	int	21h
	jc	erop
 	
 	; Delete file
	mov  dx,offset file
    mov	ah,41h
	int	21h
	jc	erop

 	; Change directory to root cat
   	mov dx,offset rootcat
    mov ah,3bh
    int 21h
    jc  erop

 	; Delete cat
    mov	dx,offset cat
	mov	ah,3ah
	int	21h
	jc	erop
 
exit:	
	mov	ax,4c00h			; Exit all good
	int	21h
 
erop:	
	mov	dx,offset error_msg
	mov	ah,9
	int	21h	
	jmp	exit
cseg	ends
	end	start