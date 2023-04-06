package net.myapp.application.transactions;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import net.myapp.application.data.entity.Transaction;

public interface TransactionRepository extends JpaRepository<Transaction,Long>{

    @Query("SELECT t FROM Transaction t join Room r WHERE r.id =:roomid and t.check_out_at is null ")
    Transaction findBookedByRoom(@Param("roomid") Long roomid);   
}
