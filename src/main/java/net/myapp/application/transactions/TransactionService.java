package net.myapp.application.transactions;

import java.util.List;

import org.springframework.stereotype.Service;

import net.myapp.application.data.entity.Transaction;

@Service
public class TransactionService {
    
    TransactionRepository trRepo;

    public TransactionService(TransactionRepository trRepo) {
        this.trRepo = trRepo;
    }

    public List<Transaction> getAll(){
        return trRepo.findAll();
    }

    public Transaction getOne(Long id){
        return trRepo.findById(id).get();
    }

    public Transaction save(Transaction transaction){
        return trRepo.save(transaction);
    }

    public void delete(Transaction transaction){
        trRepo.delete(transaction);
    }
}
