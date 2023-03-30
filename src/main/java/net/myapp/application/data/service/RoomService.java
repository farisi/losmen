package net.myapp.application.data.service;

import org.springframework.stereotype.Service;

import net.myapp.application.data.repository.RoomRepository;
import java.util.List;
import net.myapp.application.data.entity.Room;

@Service
public class RoomService {
    private RoomRepository roomRepo;

    public RoomService(RoomRepository roomRepo) {
        this.roomRepo = roomRepo;
    }

    public List<Room> all(){
        return roomRepo.findAll();
    }

    public Room save(Room r) {
        return roomRepo.save(r);
    }

    public Room findById(Integer id) {
        return roomRepo.findById(id).get();
    }

    public void delete(Room r) {
        roomRepo.delete(r);
    }
}
