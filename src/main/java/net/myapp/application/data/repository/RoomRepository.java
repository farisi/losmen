package net.myapp.application.data.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import dev.hilla.Nonnull;
import net.myapp.application.data.entity.Room;
import net.myapp.application.data.entity.RoomStatus;

public interface RoomRepository extends JpaRepository<Room,Integer>{

    @Query("SELECT r FROM Room r where r.status =:status")
    List<@Nonnull Room> findByStatus(@Param("status") RoomStatus status);
}
