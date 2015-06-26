import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

/**
 * Created by Mike on 13.07.2014.
 */
public class Solver {

    private final int moves;
    private final List<Board> solution;
    private final boolean solvable;

    private static class Step {
        private int move;
        private final Board board;
        private Step previous;
        private final int manhattanPriority;

        private Step(int move, Board board, Step previous) {
            this.move = move;
            this.board = board;
            this.previous = previous;
            this.manhattanPriority = move + board.manhattan();
        }

        int manhattanPriority() {
            return manhattanPriority;
        }

        public Board getBoard() {
            return board;
        }

        public Step getPrevious() {
            return previous;
        }

        @Override
        public String toString() {
            return ">> moves " + move + "\r\n"
                    + "priority=" + manhattanPriority + "\r\n"
                    + board;
        }
    }

    // find a solution to the initial board (using the A* algorithm)
    public Solver(Board initial) {

        Comparator<Step> manhattanComparator = new Comparator<Step>() {
            @Override
            public int compare(Step s1, Step s2) {
                if (s1.manhattanPriority() == s2.manhattanPriority()) {
                    return s1.board.manhattan() - s2.board.manhattan();
                }
                return s1.manhattanPriority() - s2.manhattanPriority();
            }
        };

        boolean isSolvable = true;
        MinPQ<Step> queue = new MinPQ<>(manhattanComparator);
        MinPQ<Step> twinQueue = new MinPQ<>(manhattanComparator);

        queue.insert(new Step(0, initial, null));
        twinQueue.insert(new Step(0, initial.twin(), null));

        Step currentStep = null;

        while (true) {
            Step currentTwinStep = twinQueue.delMin();
            if (currentTwinStep.getBoard().isGoal()) {
                isSolvable = false;
                break;
            }

            currentStep = queue.delMin();
            Board current = currentStep.getBoard();

            if (current.isGoal()) {
                break;
            }

            addNeighbours(twinQueue, currentTwinStep);
            addNeighbours(queue, currentStep);
        }

        this.solvable = isSolvable;
        if (isSolvable) {
            this.solution = new ArrayList<>();
            Step tmp = currentStep;
            while (tmp != null) {
                solution.add(0, tmp.board);
                tmp = tmp.previous;
            }
            this.moves = solution.size() - 1;
        } else {
            this.moves = -1;
            this.solution = null;
        }

    }

    private void addNeighbours(MinPQ<Step> queue, Step currentStep) {
        Step previousStep = currentStep.getPrevious();
        boolean grannyFound = false;
        for (Board neighbour : currentStep.board.neighbors()) {
            if (previousStep == null || grannyFound || !neighbour.equals(previousStep.board)) {
                queue.insert(new Step(currentStep.move + 1, neighbour, currentStep));
            } else {
                grannyFound = true;
            }
        }
    }

    // is the initial board solvable?
    public boolean isSolvable() {
        return solvable;
    }

    // min number of moves to solve initial board; -1 if no solution
    public int moves() {
        return moves;
    }

    // sequence of boards in a shortest solution; null if no solution
    public Iterable<Board> solution() {
        return solution;
    }

    // solve a slider puzzle (given below)
    public static void main(String[] args) {

        // create initial board from file
        In in = new In(args[0]);
        int N = in.readInt();
        int[][] blocks = new int[N][N];
        for (int i = 0; i < N; i++)
            for (int j = 0; j < N; j++)
                blocks[i][j] = in.readInt();
        Board initial = new Board(blocks);

        // solve the puzzle
        Solver solver = new Solver(initial);

        // print solution to standard output
        if (!solver.isSolvable())
            StdOut.println("No solution possible");
        else {
            StdOut.println("Minimum number of moves = " + solver.moves());
            for (Board board : solver.solution())
                StdOut.println(board);
        }
    }

}
