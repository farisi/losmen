package net.myapp.application.transactions;

import java.util.List;

import org.springframework.stereotype.Service;

import dev.hilla.Nonnull;
import net.myapp.application.data.entity.Room;
import net.myapp.application.data.entity.RoomStatus;
import net.myapp.application.data.entity.Transaction;
import net.myapp.application.data.repository.RoomRepository;

@Service
public class TransactionService {
    
    TransactionRepository trRepo;
    RoomRepository roomRepo;

    public TransactionService(TransactionRepository trRepo, RoomRepository roomRepo) {
        this.trRepo = trRepo;
        this.roomRepo = roomRepo;
    }

    public List<Transaction> getAll(){
        return trRepo.findAll();
    }

    public Transaction getOne(Long id){
        return trRepo.findById(id).get();
    }

    public Transaction save(Transaction transaction){
        Room room = roomRepo.findById(transaction.getRoom().getId()).orElseThrow(() -> new RuntimeException(
            "Could not find Company with ID " + transaction.getRoom().getId()));
        transaction.setRoom(room) ;
        room.setStatus(RoomStatus.Occupied);
        return trRepo.save(transaction);
    }

    public void delete(Transaction transaction){
        trRepo.delete(transaction);
    }

    public Transaction getRoomBooked(Long roomid) {
        return trRepo.findBookedByRoom(roomid);
    }

    public @Nonnull Transaction checkout(Transaction transaction) {
        Room room = roomRepo.findById(transaction.getRoom().getId()).orElseThrow(() -> new RuntimeException(
            "Could not find Company with ID " + transaction.getRoom().getId()));
        room.setStatus(RoomStatus.Vacant);
        transaction.setRoom(room);
        return trRepo.save(transaction);
    }
}
