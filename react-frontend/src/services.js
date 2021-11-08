import * as axios from 'axios';

const axiosInst = axios.create({
    baseURL: 'https://localhost:5001/api',
})

export const GenerateShips = async () => {
    try {
        const { data } = await axiosInst.get('/battleship/GenerateShips');

        return data;

    }
    catch {
        console.log("Error! Could not load battleship data.");
    }
}

export const SimulateGame = async (playersShips) => {
    try {
      
        const { data } = await axiosInst.post('/battleship/SimulateGame', playersShips, { headers: {"Content-Type": 'application/json'}})

        return data;

    }
    catch {
        console.log("Error! Could not load battleship data.");
    }
}