sseg   segment stack
    db     256     dup(?)
sseg ends

dseg   segment
    buf       db      "mike$"
    error_msg  db     "Error occured$"
dseg ends

cseg  segment
      assume   cs:cseg,ds:dseg,ss:sseg

start:
      jmp   main
main:
      push  ds
      mov   ax,0
      push  ax
      mov   ax,dseg
      mov   ds,ax

      ; Initialization
      mov   ah,0
      mov   dx,0 ; Port number
      mov   al,11111111B
      int   14h

      mov   si,0
      mov   cx,4 ; Size of the buffer

print_symbol:      
      ; Check status
      mov   ah,3
      int   14h
      test  ah,100000B
      jz    print_symbol

      mov   ah,1
      mov   al,buf[si]
      int   14h
      test  ah,11110b
      jnz   err

      inc   si
      loop  print_symbol
       
exit:
      mov   ax,4c00h
      int   21h

err:      
      mov   dx,offset error_msg
      mov   ah,9
      int   21h
      jmp   exit

cseg  ends
      end start
