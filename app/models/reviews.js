import client from '../services/database';

class Reviewsession {
    static reviewSession(review){
        const sessionQuery ='INSERT INTO sessionReviews (session_id, mentor_id, mentee_id, score,mentee_full_name, remarks) VALUES($1,$2,$3,$4,$5,$6) returning *';
        const values = [review.session_id,review.mentor_id,review.mentee_id,review.score,review.mentee_full_name,review.remarks]
        return client.query(sessionQuery, values); 
    } 
    
static notReviewAgain(mentee_id,session_id){
    const query = 'SELECT * FROM sessionReviews WHERE mentee_id=$1 and session_id = $2'
    return client.query(query, [mentee_id,session_id]); 
}
}


export default Reviewsession; 


