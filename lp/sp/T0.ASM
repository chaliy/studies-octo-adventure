; Please NOTE this program does not work
; Most likly issues are in "test al,10000000b ; Test if ready"
; This code checks if CMOS is ready to show go

sseg segment stack
    db 256 dup(?)
sseg ends
dseg segment
    error_message db 'Unhandled error occured.$'
dseg ends

cseg segment
    assume ss:sseg, cs:cseg, ds:dseg 
start:
    jmp main 
main:   

    mov ax,seg dseg
    mov ds,ax

;    mov cx, 100
;
;wait_rtc:
;    
;    mov al,0Ah
;    out 70h,al
;    in al,71h
;
;    test al,10000000b ; Test if ready
;    jnz read_rtc
;
;    loop wait_rtc
;
;    jmp erop

read_rtc:

    mov al,07h
    out 70h,al
    in al,71h

    mov dl,al
    ; add dl, '0'
    mov ah,2
    int 21h

exit:
    ; Exit all good
    mov ax,4c00h
    int 21h

erop: 
    ; Show error message
    mov dx,offset error_message
    mov ah,9
    int 21h

    jmp exit 


cseg ends
 end start