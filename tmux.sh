S="social-media"

tmux new-session -s $S -d -n nvim 
tmux send-keys -t $S:nvim 'nvim' Enter

tmux new-window -t $S -d -n run
tmux send-keys -t $S:run 'pnpm dev' Enter

tmux attach-session -t $S
