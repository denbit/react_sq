import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
function calculateWinner(squares) {


    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}
function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {"B"+props.value}
        </button>
    );
    
}


class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            sq:(new Array(9).fill('')),
            isX:true,
            count:0,
           win:false
        }
    }

    handleClk(e){
        const sq=this.state.sq.slice();
        if(sq[e]||this.props.win){ return;}
        const x=!this.state.isX;
        sq[e]=x?'X':'O';
        let c=this.state.count;

        if(this.props.win){
            this.props.historyClk(sq);
            this.setState({
                sq:sq,
                isX:x,
                count:++c,
                win:true
            });
            return;
        }
        this.props.historyClk(sq);
        this.setState({
            sq:sq,
            isX:x,
            count:++c});
    }
    renderSquare(i) {
        return <Square value={this.state.sq[i]} onClick={()=>{this.handleClk(i)}} />;
    }
    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.goTo !== prevProps.goTo&&this.props.goTo!=null) {
            const st={};
            Object.assign(st,this.state);
            st.sq=this.props.goTo;
            this.setState(st);
        }
    }

    render() {
        let status;


        if(!this.props.win){
            status = 'Next player: '+(!this.state.isX?'X':'O');
        }else {
            status="Winner is"+(this.props.win);
        }


        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state={history:[],
            currentGame:null}

    }

    historyClk(h){
        const history_state=this.state.history.length;
        let hist=this.state.history;
        hist[history_state]=h;

    this.setState({history:hist,currentGame:null});
    console.log(hist);
    }


    jumpTo(targetMove){
    const state=this.state.history;
    this.setState({history:state,currentGame:state[targetMove]});
    }
    render() { let winner;
        if(this.state.history.length>0){
            winner=calculateWinner(this.state.history[this.state.history.length-1]);
        }else {winner=null;}
    const history=this.state.history.map((step,moves)=>{
            const descr=moves?`Go to move#${moves}`:"Go to the start";
        return (
            <li key={moves}>
                <button onClick={() => this.jumpTo(moves)}>{descr}</button>
            </li>
        );
    });


        return (
            <div className="game">
                <div className="game-board">
                    <Board win={winner} goTo={this.state.currentGame} historyClk={(i)=>this.historyClk(i)} />
                </div>
                <div className="game-info">
                    <div>{}</div>
                    <ol>{history}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
