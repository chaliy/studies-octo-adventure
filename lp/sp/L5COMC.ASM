sseg  segment stack
    db     256     dup(?)
sseg  ends

dseg  segment
	buf    db  4 dup (?)
	error_msg  db      "Error occures$"
dseg  ends

cseg  segment
    assume  cs:cseg,ds:dseg,ss:sseg

start:    
	jmp   main
main:   
	push  ds
    mov   ax,0
    push  ax
    mov   ax,dseg
    mov   ds,ax

    ; Init port
    mov   ah,0
    mov   dx,0
    mov   al,11111111B
    int   14h

	mov   si,0
    mov   cx,4
read_symbol:       

	; Check status
	mov   ah,3
    int   14h
    test  ah,1B
    jz    read_symbol

    ; Read symbol
    mov    ah,2
    int    14h
    test   ah,11110B
    jnz    err

    mov    buf[si],al
    inc    si
    loop   read_symbol
    
exit:     
	mov    ax,4c00h
    int    21h
err:      
	mov    dx,offset error_msg
    mov    ah,9
    int    21h
    jmp    exit

cseg  ends
    end  start
