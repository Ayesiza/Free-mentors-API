import Session from '../models/sessions';
import { sessions } from '../data/sessionData'

export class SessionController {
  static createSession(req, res) {
    const { mentorId, questions } = req.body;
    const sessionId = sessions.length + 1;
    const { id, email } = req.user
    const newSession = new Session(sessionId, mentorId, questions, id, email)
    const data = newSession.createSession();
    return res.status(200).send({ status: 200, data });
  }

  static acceptMentorshipSession(req, res) {
    if(req.session.status==='accepted') return res.status(409).send({status:409, message:'Session Already Accepted'})
    const session = Session.acceptMentorshipSession(req.session)
    return res.send({ status: 200, session })
  }


  static rejectSession(req, res) {
    const session = Session.rejectSession(req.session)
    return res.send({ status: 200, session, message:'Your session NOT accepted.All Sessions are booked at the moment' })
  }
}

export default SessionController;
