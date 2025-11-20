import mongoose from 'mongoose';
import { AggregateRoot } from '../../core/domain/AggregateRoot';
import { Result } from '../../core/logic/Result';
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { CaminhoEnergiaNecessariaKWh } from './CaminhoEnergiaNecessariaKWh';
import { CaminhoTempoDeslocacaoMin } from './CaminhoTempoDeslocacaoMin';
import { CaminhoDistanciaArmazens } from './CaminhoDistanciaArmazens';
import { Guard } from "../../core/logic/Guard";
import ICaminhoDTO from '../../dto/ICaminhoDTO';


interface CaminhoProps {
    energiaNecessariaKWh: CaminhoEnergiaNecessariaKWh;
    tempoDeslocacaoMin: CaminhoTempoDeslocacaoMin;
    idArmazemOrigem: string;
    idArmazemDestino: string;
    distanciaEntreArmazens: CaminhoDistanciaArmazens;
}


export class Caminho extends AggregateRoot<CaminhoProps>{
    caminho: Result<CaminhoDistanciaArmazens>;

    get id(): UniqueEntityID {
        return this._id;
    }

    get energiaNecessariaKWh(): CaminhoEnergiaNecessariaKWh {
        return this.props.energiaNecessariaKWh;
    }

    set energiaNecessariaKWh(value: CaminhoEnergiaNecessariaKWh) {
        this.props.energiaNecessariaKWh = value;
    }

    get tempoDeslocacaoMin(): CaminhoTempoDeslocacaoMin {
        return this.props.tempoDeslocacaoMin;
    }

    set tempoDeslocacaoMin(value:CaminhoTempoDeslocacaoMin)  {
        this.props.tempoDeslocacaoMin = value;
    }

    get idArmazemOrigem(): string {
        return this.props.idArmazemOrigem;
    }

    set idArmazemOrigem(value: string) {
        this.props.idArmazemOrigem = value;
    }

    get idArmazemDestino(): string {
        return this.props.idArmazemDestino;
    }

    set idArmazemDestino(value: string) {
        this.props.idArmazemDestino = value;
    }

    
    get distanciaEntreArmazens(): CaminhoDistanciaArmazens {
        return this.props.distanciaEntreArmazens;
    }

    set distanciaEntreArmazens (value : CaminhoDistanciaArmazens) {
        this.props.distanciaEntreArmazens = value;

    }

    


    private constructor(props: CaminhoProps, id?: UniqueEntityID
    ) {
        super(props, id);
    }

    public static create(props: CaminhoProps, id?: UniqueEntityID): Result<Caminho> {
        const guardedProps = [
            { argument: props.energiaNecessariaKWh, argumentName: 'energiaNecessariaKWh' },
            { argument: props.tempoDeslocacaoMin, argumentName: 'tempoDeslocacaoMin' },
            { argument: props.idArmazemOrigem, argumentName: 'idArmazemOrigem' },
            { argument: props.idArmazemDestino, argumentName: 'idArmazemDestino' },
            { argument: props.distanciaEntreArmazens, argumentName: 'distanciaEntreArmazens' }
        ];

        const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

        if (!guardResult.succeeded) {
            return Result.fail<Caminho>(guardResult.message)
        }
        else {
            const caminho = new Caminho( {
                ...props
            }, id);

            return Result.ok<Caminho>(caminho);
        }
    }
    

}
