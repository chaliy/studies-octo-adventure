from post import *

Post.run(
	[0,0,0,1,0,0,0,0],	
	{
		1: control('R', 2),
		2: control('?1', 3),
		3: control('X', 4),
		4: control('L', 5),
		5: control('!', 0),
	}
)


#2.4
Post.run(
	[0,0,0,1,1,1,1,1],	
	{
		1: control('R', 2),
		2: control('?1', 3),
		3: control('V', 4),
		4: control('!', 0),
	}
)

#3
Post.run(
	[1,0,1,1,1,1],	
	{
		1: control('?2', 3),
		2: control('!', 0),
		3: control('R', 4),
		4: control('?7', 5),
		5: control('X', 6),
		6: control('R', 9),
		7: control('V', 8),
		8: control('L', 2),
		9: control('?12', 10),
		10: control('X', 11),
		11: control('R', 1),
		12: control('V', 13),
		13: control('L', 1),
	},
	head_position = 2
)

#5
Post.run(
	[0,1,1,1],	
	{
		1: control('?2', 3),
		2: control('R', 1),
		3: control('R', 4),
		4: control('?5', 3),
		5: control('V', 6),
		6: control('R', 7),
		7: control('V', 8),
		8: control('!', 0)
	}
)

#6
Post.run(
	[1,1,1,0,0,0,1,1],	
	{
		1: control('X', 2),
		2: control('R', 3),
		3: control('?4', 2),
		4: control('V', 5),
		5: control('R', 6),
		6: control('?8', 7),
		7: control('!', 0),
		8: control('L', 9),
		9: control('?10', 8),
		10: control('R', 1),
	}
)

Post.run(
 	[1,1,0,0,0,1,1,1,1,0,0,0,1,1,0,0,0,1,1,1,0,0,0,1,1],	
 	{
 		# 1
 		1: control('?3', 2),
 		2: control('R', 1),
 		# 0		
		3: control('R', 4),
		4: control('R', 5),
		5: control('R', 6),
		6: control('?14', 7), 	
 		# 1 -> 0
 		7: control('?10', 8),
 		8: control('X', 9),
 		9: control('R', 7),
 		# 0
 		10: control('R', 11),
 		11: control('R', 12),
 		12: control('R', 13),
 		13: control('?14', 1), 		
 		14: control('!', 0),
	})