export class Carro {
    private _id: any
    private _marca: string
    private _modelo: string
    private _placa: string
    private _cor: string
    private _ano: number
    private _dt_ultima_revisao: string
    private _dt_prox_revisao: string
    private _downloadURL: any
    private _kilometragem: number

    constructor(marca: string, modelo: string, placa: string, cor: string, ano: number, dt_ultima_revisao: string, kilometragem: number){
        this._marca = marca
        this._modelo = modelo
        this._placa = placa
        this._cor = cor
        this._ano = ano
        this._kilometragem = kilometragem
        this._dt_ultima_revisao = dt_ultima_revisao
        let dt = new Date(dt_ultima_revisao)
        dt.setFullYear(dt.getFullYear() + 1)
        this._dt_prox_revisao = dt.toISOString()
      }

    public get id(): any{
        return this._id;
    }

    public get marca(): string{
        return this._marca;
    }

    public get modelo(): string{
        return this._modelo;
    }
    public get placa(): string{
        return this._placa;
    }
    public get cor(): string{
        return this._cor;
    }
    public get ano(): number{
        return this._ano;
    }
    public get dt_ultima_revisao(): string{
        return this._dt_ultima_revisao;
    }
    public get dt_prox_revisao(): string{
        return this._dt_prox_revisao;
    }
    public get kilometragem(): number{
        return this._kilometragem;
    }
    
    public set modelo(modelo: string){
        this._modelo = modelo
    }
    public set placa(placa: string){
        this._placa = placa
    }
    public set cor(cor: string){
        this._cor = cor
    }
    public set ano(ano: number){
        this._ano = ano
    }
    public set dt_ultima_revisao(dt_ultima_revisao: string){
        this._dt_ultima_revisao = dt_ultima_revisao
    }
    public set dt_prox_revisao(dt_prox_revisao: string){
        this._dt_prox_revisao = dt_prox_revisao
    }

    public set kilometragem(kilometragem: number){
        this._kilometragem = kilometragem
    }

    public set downloadURL(downloadURL: any){
        this._downloadURL = downloadURL;
    }
    
    public set marca(marca: string){
        this._marca = marca
    }

    public get downloadURL(): any{
        return this._downloadURL;
    }

}
