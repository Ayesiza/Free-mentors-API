import jwt from 'jsonwebtoken';
import {sessions} from '../models/sessions';
const appSecretkey = 'tesyuseyeyseyuwu'

export const createSession = ( req, res) => {
    jwt.verify(req.token, appSecretkey, (err, mentee) => {
        if (err) return res.status(403).json({ error: 403, message: err.message });
      
    const {mentorId, questions} =req.body;
    const sessionId = sessions.length + 1;
    const session = {sessionId, mentorId, questions, menteeId:mentee.id, menteeEmail:mentee.email, status:'pending'}
    sessions.push(session);
        res.status(200).send({status:200,session});
    })      
}

