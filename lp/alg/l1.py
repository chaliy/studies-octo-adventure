from post import *

# 6
Machine.run(
	[0,1,1,1,1],	
	{
		# Move right to first mark
		1: control('R', 2),
		2: control('?1', 3),

		# Move to next and replace with zero
		3: control('R', 4), 
		4: control('X', 5),
		
		# Move right to first unmarked
		5: control('R', 6),
		6: control('?7', 5),

		# Set mark to ensure that we didn't lost mark
		7: control('V', 8), 

		# If next left is unmarked this means all items azre zipped
		8: control('L', 9),
		9: control('?10', 11),
		10: control('!', 0),

		# Move left to find firt unmarked
		11: control('L', 12),
		12: control('?13', 11),
		# Position to next marked and loop
		13: control('R', 14),
		14: control('R', 4),
	}
)