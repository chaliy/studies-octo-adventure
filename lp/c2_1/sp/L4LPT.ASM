         title   lpt
.286
sseg     segment stack
         db      256 dup(?)
sseg     ends
dseg     segment stack         
dseg     ends
cseg     segment
         assume  ss:sseg,cs:cseg,ds:dseg
start:   
   jmp     main
main:    
   push    ds
   xor     ax,ax
   push    ax
   mov     ax,dseg
   mov     ds,ax

   mov     si,0
   ; Get port address LPT1 from BIOS 0040:0008
   mov     ax,40h
   mov     es,ax
   mov     dx,es:[8]      ; 378h
   
   mov     al,0
   out     dx,al
   inc     dx
   in      al,dx
   call    print_port
   mov     ah,8  ; Wait for input
   int     21h

   dec     dx
   mov     al,11111111b
   out     dx,al
   inc     dx
   in      al,dx
   call    print_port
   mov     ah,8
   int     21h

   inc     dx
   mov     al,0
   out     dx,al
   dec     dx
   in      al,dx
   call    print_port
   mov     ah,8
   int     21h

   inc     dx
   mov     al,1
   out     dx,al
   dec     dx
   in      al,dx
   call    print_port
   mov     ah,8
   int     21h

exit:   
   mov     ax,4c00h
   int     21h

print_port     proc    near
   push    dx
   mov     dh,10000000b
ci:      
   mov     dl,'0'
   push    ax
   test    al,dh
   jz      m0
   mov     dl,'1'
m0:      
   mov     ah,2
   int     21h
   pop     ax
   shr     dh,1
   jnz     ci
   pop     dx
   ret
print_port     endp

cseg     ends
   end     start
