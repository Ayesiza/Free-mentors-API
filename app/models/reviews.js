
class Reviewsession {
    static reviewSession(review){
        const sessionQuery ='INSERT INTO sessionsReviews (sessionId, mentorId, menteeId, score,menteeFullName, remarks) VALUES($1,$2,$3,$4,$5,$6) returning *';
        const values = [review.sessionId,review.mentorId,review.menteeId,review.score,review.menteeFullName,review.remarks]
        return client.query(sessionQuery, values); 
    } 
    
static notReviewAgain(menteeId,sessionId){
    const query = 'SELECT * FROM sessions WHERE menteeId=$1 and sessionId = $2'
    return client.query(query, [menteeId,sessionId]); 
}
}


export default Reviewsession; 


