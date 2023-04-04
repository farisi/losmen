package net.myapp.application.data.endpoint;

import com.vaadin.flow.server.auth.AnonymousAllowed;

import dev.hilla.Endpoint;
import dev.hilla.Nonnull;

import java.util.List;
import net.myapp.application.data.service.RoomService;
import net.myapp.application.data.entity.Room;
import net.myapp.application.data.entity.RoomStatus;

@Endpoint
@AnonymousAllowed
public class RoomEndpoint {

    private RoomService roomSrv;

    public RoomEndpoint(RoomService roomSrv){
        this.roomSrv = roomSrv;
    }

    @Nonnull
    public List<@Nonnull Room> getRooms(){
        return roomSrv.all();
    }

    @Nonnull
    public Room save(Room r){
        r.setStatus(RoomStatus.Vacant);
        r.setId(r.getNumber());
        return roomSrv.save(r);
    }
    
    public void deleteRoom(@Nonnull Integer id){
        Room room = roomSrv.findById(id);
        roomSrv.delete(room);
    }

    @Nonnull
    public List<@Nonnull Room> vacantRoom() {
        return roomSrv.findVacantRooms();
    }

    @Nonnull
    public List<@Nonnull Room> occupiedRoom(){
        return roomSrv.findOccupiedRooms();
    }

    @Nonnull
    public Room getRoom(Integer id){
        System.out.println("ID Room : " +id);
        return roomSrv.findById(id);
    }
}
