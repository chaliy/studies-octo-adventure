sseg segment stack
    db 256 dup(?)
sseg ends
dseg segment
        message db "Press any key to exit...", "$"   
dseg ends
cseg segment
 start:
 
    mov    ax,seg dseg
    mov    ds,ax

    ; VGA Mode
    mov    ax,0012h
    int    10h

    ; Draw pixel
    mov    bh,0
    mov    ah,0ch
    mov    al,15
    mov    cx,30
    mov    dx,40
 draw: 
    int    10h
    inc    cx
    cmp    cx,50
    jle    draw
    
    call press_any_key

    ; Clean view port
    mov    ax,0003h ; Text mode
    int    10h

    ; Exit all good
    mov    ax,4c00h
    int    21h

press_any_key:
    ; Print "Press any key to exit"
    mov    ah,09    
    lea    dx,message
    int    21h
    ; Wait for user input
    mov    ax,0008h
    int    21h
    ret

cseg ends
 end start