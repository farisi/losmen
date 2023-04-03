package net.myapp.application.transactions;

import org.springframework.data.jpa.repository.JpaRepository;

import net.myapp.application.data.entity.Transaction;

public interface TransactionRepository extends JpaRepository<Transaction,Long>{
    
}
