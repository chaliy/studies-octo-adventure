.286
.model    tiny
.stack 256
.code
    org    100h
start:    
    jmp      main
    vold  dd ?
    error_msg db    "errr occured$"
handl    proc    far
    push  cs
    pop   ds
    pusha

    ; Turn on beep
    mov    ah,6
    mov    dl,7
    int    21h

    ;відключаю сигнал переривань годинника реального часу
    mov    ah,07h
    int    1ah

    ; Revert to old handler
    lds    dx,vold
    mov    ah,25h
    mov    al,4ah
    int    21h
    popa

    ; Handle priorities
    mov    al,20h
    out    0ah,al
    out    20h,al

    iret
fin    equ    $
handl    endp

main:    
	push   cs
    pop    ds
    pusha

    ; Drop previous alarams
    mov    ah,07h
    int    1ah

    ; Set new time
    mov    ch,00100011b
    mov    cl,01000101b
    mov    dh,00110101b
    mov    ah,06h
    int    1ah
    jc     err

    ; Save old handle
    mov    ah,35h
    mov    al,4ah
    int    21h
    mov    word ptr vold,bx
    mov    word ptr vold+2,es
    push    ds

    ; Set new handle
    mov    dx,offset handl
    mov    al,4ah
    mov    ah,25h
    int    21h       

    ; Return back
    pop    ds
    popa
    lea    dx,fin
    int    27h

err:
    mov   dx,offset error_msg
  	mov   ah,9
  	int   21h

    ret
end    start
