package net.myapp.application.transactions;

import java.util.List;

import com.vaadin.flow.server.auth.AnonymousAllowed;

import dev.hilla.Endpoint;
import dev.hilla.Nonnull;
import net.myapp.application.data.entity.Room;
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
    public Transaction getRoomBooked(Long roomid){
        return trSrv.getRoomBooked(roomid);
    }

    public void remove(@Nonnull Transaction transaction){
        trSrv.delete(transaction);
    }
}
