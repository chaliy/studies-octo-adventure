        title   study

sseg    segment stack
    db      256 dup(?)
sseg    ends

dseg    segment
	d1      db     10
dseg    ends'
cseg    segment
        assume  ss:sseg,cs:cseg,ds:dseg
start:  
	jmp main

main:   
	push   ds 
    xor    ax,ax
    push   ax
    mov    ax,dseg
    mov    ds,ax




exit:   
	mov ax,4c00h
    int 21h 
cseg    ends
    end    start
