import mongoose from 'mongoose';
import { AggregateRoot } from '../../core/domain/AggregateRoot';
import { Result } from '../../core/logic/Result';
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Guard } from "../../core/logic/Guard";
import ICaminhoDTO from '../../dto/ICaminhoDTO';
import { CamiaoMatricula } from '../camiao/camiaoMatricula';
import { List } from 'lodash';
import { PlanoEntregaId } from './planoEntregaId';


interface PlanoEntregaProps {
    camiaoMatricula: string;
    caminho: string[];
    data: Date;
    entregas: string[];
}


export class PlanoEntrega extends AggregateRoot<PlanoEntregaProps> {
    get id (): UniqueEntityID {
      return this._id;
    }
  
    get PlanoEntregaId (): PlanoEntregaId {
      return new PlanoEntregaId(this.PlanoEntregaId.toString());
    }

    get camiaoMatricula (): string {
        return this.props.camiaoMatricula;
      }
  
    get caminho (): string[] {
      return this.props.caminho;
    }
  
    get data (): Date {
      return this.props.data;
    }

    get entregas (): string[] {
      return this.props.entregas;
    }
  
    private constructor (props: PlanoEntregaProps, id?: UniqueEntityID) {
      super(props, id);
    }
  
    public static create (props: PlanoEntregaProps, id?: UniqueEntityID): Result<PlanoEntrega> {
  
      const guardedProps = [
       // { argument: props.matricula, argumentName: 'matricula'},
        { argument: props.camiaoMatricula, argumentName: 'camiaoMatricula'},
        { argument: props.caminho, argumentName: 'caminho' },
        { argument: props.data, argumentName: 'data' },
        { argument: props.entregas, argumentName: 'entregas' },
      ];
  
      const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);
  
      if (!guardResult.succeeded) {
        return Result.fail<PlanoEntrega>(guardResult.message)
      }     
      else {
        const user = new PlanoEntrega({
          ...props
        }, id);
  
        return Result.ok<PlanoEntrega>(user);
      }
    }
  }
  