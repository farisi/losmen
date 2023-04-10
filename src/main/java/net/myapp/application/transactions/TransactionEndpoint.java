package net.myapp.application.transactions;

import java.util.List;

import com.vaadin.flow.server.auth.AnonymousAllowed;

import dev.hilla.Endpoint;
import dev.hilla.Nonnull;
import net.myapp.application.data.entity.Transaction;

@Endpoint
@AnonymousAllowed
public class TransactionEndpoint {

    private TransactionService trSrv;
    
    public TransactionEndpoint(TransactionService trSrv) {
        this.trSrv = trSrv;
    }

    @Nonnull
    public List<@Nonnull Transaction> getTransactions() {
        return trSrv.getAll();
    }

    @Nonnull
    public Transaction save(@Nonnull Transaction transaction){
        return trSrv.save(transaction);
    }

    @Nonnull
    public Transaction checkout(@Nonnull Transaction transaction){
        return trSrv.checkout(transaction);
    }

    @Nonnull
    public Transaction getRoomBooked(Long roomid){
        Transaction tr = trSrv.getRoomBooked(roomid);
        System.out.println("test print get Room booked " + tr.getName());
        return tr;
    }

    public void remove(@Nonnull Transaction transaction){
        trSrv.delete(transaction);
    }
}
