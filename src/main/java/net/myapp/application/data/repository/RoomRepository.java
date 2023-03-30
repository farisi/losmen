package net.myapp.application.data.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import net.myapp.application.data.entity.Room;

public interface RoomRepository extends JpaRepository<Room,Integer>{
    
}
