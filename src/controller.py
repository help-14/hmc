import pygame
pygame.init()
joysticks = []
clock = pygame.time.Clock()
keepPlaying = True

while True:
for event in pygame.event.get():
    if event.type == pygame.QUIT:
        done=True
 
    if event.type == pygame.JOYBUTTONDOWN:
        print("Joystick button pressed.")
    if event.type == pygame.JOYBUTTONUP:
        print("Joystick button released.")
 
screen.fill(darkgrey)
textPrint.reset()
 
joystick_count = pygame.joystick.get_count()
 
textPrint.print(screen, "Number of joysticks: {}".format(joystick_count) )
textPrint.indent()
 
for i in range(joystick_count):
    joystick = pygame.joystick.Joystick(i)
    joystick.init()
 
    textPrint.print(screen, "Joystick {}".format(i) )
    textPrint.indent()
 
    name = joystick.get_name()
    textPrint.print(screen, "Joystick name: {}".format(name) )
 
    axes = joystick.get_numaxes()
    textPrint.print(screen, "Number of axes: {}".format(axes) )
    textPrint.indent()
 
    for i in range( axes ):
        axis = joystick.get_axis( i )
        textPrint.print(screen, "Axis {} value: {:>6.0f}".format(i, axis) )
    textPrint.unindent()
 
    buttons = joystick.get_numbuttons()
    textPrint.print(screen, "Number of buttons: {}".format(buttons) )
    textPrint.indent()
 
    for i in range( buttons ):
        button = joystick.get_button( i )
        textPrint.print(screen, "Button {:>2} value: {}".format(i,button) )
    textPrint.unindent()
 
    hats = joystick.get_numhats()
    textPrint.print(screen, "Number of hats: {}".format(hats) )
    textPrint.indent()
 
    for i in range( hats ):
        hat = joystick.get_hat( i )
        textPrint.print(screen, "Hat {} value: {}".format(i, str(hat)) )
    textPrint.unindent()
 
pygame.display.flip()
clock.tick(20)